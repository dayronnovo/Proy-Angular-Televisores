import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Multimedia } from '../../models/multimedia';
import { CronogramaService } from '../../services/cronograma.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styles: [],
})
export class CronogramaComponent implements OnInit {
  cliente: Cliente;
  formad: FormGroup;
  multimedias: any[] = [];
  televisores: Televisor[] = [];
  paginador_televisor: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private televisorService: TelevisorService,
    private cronogramaService: CronogramaService,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.crearFormulario();
    this.getClienteById();
  }

  public getLabelAndFor(televisor: Televisor) {
    return `${televisor.id}-${televisor.ubicacion}`;
  }

  public getClienteById() {
    this.activatedRoute.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];
      this.clienteService.getClienteById(cliente_id).subscribe((response) => {
        this.cliente = response;
        this.loadingService.show();
        this.getTelevisoresByClienteId(null);
      });
    });
  }

  public getTelevisoresByClienteId(pagina) {
    this.televisorService
      .getTelevisoresByClienteIdWithPagination(
        this.cliente.id,
        pagina ? pagina : 1
      )
      .subscribe((response) => {
        this.televisores = response.televisores as Televisor[];
        this.paginador_televisor = response.pageable;
      });
  }

  // Formulario
  private crearFormulario() {
    this.formad = this.fb.group({
      televisores: this.fb.array([], Validators.required),
      multimedias: this.fb.array([], Validators.required),
      hora: [],
    });
  }

  private establecerValoresEnElFormulario(multimedias: any[]): void {
    this.getMultimediasIdsFormArray.clear();
    multimedias.forEach((multimedia) => {
      this.getMultimediasIdsFormArray.push(new FormControl(multimedia));
    });
  }

  public marcarElCheckboxes(option): boolean {
    let arreglo: any[] = this.getIdsFormArray.getRawValue();
    let resp: boolean = false;
    arreglo.forEach((id) => {
      if (id == option.id) {
        resp = true;
      }
    });
    return resp;
  }

  get getIdsFormArray(): FormArray {
    return this.formad.get('televisores') as FormArray;
  }
  get getMultimediasIdsFormArray(): FormArray {
    return this.formad.get('multimedias') as FormArray;
  }

  public guardar() {
    if (this.formad.invalid) {
      Object.values(this.formad.controls).forEach((control) => {
        control.markAsTouched();
      });
      console.log(this.formad.getRawValue());
      return;
    }

    let horaActual: Date = new Date();

    let hora_actual = `${horaActual.getHours()}:${horaActual.getMinutes()}`;
    let hora_inicio = `${this.formad.getRawValue()['hora']}`;

    let milisegundos = this.calcularDiferenciaDeHoras(hora_actual, hora_inicio);

    let timeId = setTimeout(() => {
      this.televisorService
        .update_multimedias(
          this.getIdsFormArray.getRawValue(),
          this.getMultimediasIdsFormArray.getRawValue()
        )
        .subscribe((data) => {});
    }, milisegundos);

    let programacion = {
      hora_de_inicio: hora_inicio == 'null' ? hora_actual : hora_inicio,
      // multimedias: this.multimedias,
      multimedias: this.getMultimediasIdsFormArray.getRawValue(),
      time_id: timeId,
      televisores: this.getIdsFormArray.getRawValue(),
      cliente: this.cliente.id,
    };

    this.cronogramaService.create(programacion).subscribe((data) => {
      Swal.fire('', `Cronograma creado con exito`, 'success');
    });
  }

  private calcularDiferenciaDeHoras(hora_actual, hora_inicio) {
    let minutos_actual = hora_actual
      .split(':')
      .reduce((p, c) => parseInt(p) * 60 + parseInt(c));
    let minutos_inicio = hora_inicio
      .split(':')
      .reduce((p, c) => parseInt(p) * 60 + parseInt(c));

    let diferencia = minutos_inicio - minutos_actual;

    return diferencia * 60 * 1000;
  }

  public getMultimediasDesdeImagenesComponent(multimedias: any[]) {
    // this.multimedias = multimedias;
    // this.getMultimediasIdsFormArray.getRawValue() = multimedias;
    // this.getMultimediasIdsFormArray.setValue(multimedias);
    this.establecerValoresEnElFormulario(multimedias);
  }

  // public desmarcarTodo() {
  //   this.getIdsFormArray.clear();
  // }

  // public marcarTodo() {
  //   this.desmarcarTodo();
  //   this.multimedias.forEach((multimedia) => {
  //     this.getIdsFormArray.push(this.fb.control(multimedia));
  //   });
  // }

  public onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.getIdsFormArray.push(this.fb.control(option.id));
    } else {
      let arreglo: any[] = this.getIdsFormArray.getRawValue();

      // this.getIdsFormArray.removeAt(num);
      arreglo.forEach((televisor_id) => {
        if (televisor_id == option.id) {
          let num: number = arreglo.indexOf(televisor_id);
          this.getIdsFormArray.removeAt(num);
        }
      });
    }
  }

  public validar(campo: string): boolean {
    return this.formad.get(campo).invalid && this.formad.get(campo).touched;
  }
  public mensajeRequerido(campo: string): boolean {
    return this.formad.get(campo).errors.required;
  }

  // Metodos para el Paginador
  // public crearPaginador() {
  //   let total_de_entities: number = this.televisores_total.length;
  //   let total_de_paginas: number = Math.ceil(
  //     total_de_entities / this.cantidad_por_pagina
  //   );

  //   for (let cont = 1; cont <= total_de_paginas; cont++) {
  //     let entities: any[] = [];
  //     for (let cont2 = 0; cont2 < this.cantidad_por_pagina; cont2++) {
  //       let entity = this.televisores_total.shift();
  //       if (entity) entities.push(entity);
  //     }
  //     this.paginadores.push(
  //       new Paginador(
  //         cont,
  //         entities,
  //         total_de_entities,
  //         total_de_paginas,
  //         cont == 1,
  //         cont == total_de_paginas
  //       )
  //     );
  //   }
  // }

  // public inicializarPaginador() {
  //   this.paginador = this.paginadores[0];
  // }

  // public paginaAnterior(): void {
  //   let index = this.paginadores.indexOf(this.paginador);
  //   this.paginador = this.paginadores[index - 1];
  // }
  // public paginaSiguiente(): void {
  //   let index = this.paginadores.indexOf(this.paginador);
  //   this.paginador = this.paginadores[index + 1];
  // }
}
