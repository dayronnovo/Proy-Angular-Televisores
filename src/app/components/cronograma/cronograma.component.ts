import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Multimedia } from '../../models/multimedia';
import { CronogramaService } from '../../services/cronograma.service';
import { Paginador } from '../shared/paginacion_pequenia/paginador';
import { CompartirEventoService } from '../../services/compartir-evento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styles: [],
})
export class CronogramaComponent implements OnInit {
  cliente: Cliente;
  formad: FormGroup;
  multimedias: any[] = [];
  televisores_total: Televisor[] = [];

  cantidad_por_pagina: number = 3;
  paginadores: Paginador[] = [];
  paginador: Paginador;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private televisorService: TelevisorService,
    private cronogramaService: CronogramaService,
    private fb: FormBuilder,
    private compartirEventoService: CompartirEventoService
  ) {}

  ngOnInit(): void {
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
        this.getTelevisoresByClienteId();
      });
    });
  }

  public getTelevisoresByClienteId() {
    this.televisorService
      .getTelevisoresByClienteId(this.cliente.id)
      .subscribe((response) => {
        this.televisores_total = response as Televisor[];
        // Paginador
        this.crearPaginador();
        this.inicializarPaginador();
      });
  }

  // Formulario
  private crearFormulario() {
    this.formad = this.fb.group({
      televisores: this.fb.array([], Validators.required),
      hora: [],
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

  public guardar() {
    if (this.formad.invalid) {
      Object.values(this.formad.controls).forEach((control) => {
        control.markAsTouched();
      });
      // return;
    }

    let horaActual: Date = new Date();

    let hora_actual = `${horaActual.getHours()}:${horaActual.getMinutes()}`;
    let hora_inicio = `${this.formad.getRawValue()['hora']}`;

    let milisegundos = this.calcularDiferenciaDeHoras(hora_actual, hora_inicio);

    let timeId = setTimeout(() => {
      console.log('Se ejecuto');
      this.televisorService
        .update_multimedias(
          this.getIdsFormArray.getRawValue(),
          this.multimedias
        )
        .subscribe((data) => {});
    }, milisegundos);

    let programacion = {
      hora_de_inicio: hora_inicio,
      multimedias: this.multimedias,
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

  public getMultimediasDesdeImagenesComponent(multimedias: Multimedia[]) {
    this.multimedias = multimedias;
    // console.log(this.multimedias);
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
  public crearPaginador() {
    let total_de_entities: number = this.televisores_total.length;
    let total_de_paginas: number = Math.ceil(
      total_de_entities / this.cantidad_por_pagina
    );

    for (let cont = 1; cont <= total_de_paginas; cont++) {
      let entities: any[] = [];
      for (let cont2 = 0; cont2 < this.cantidad_por_pagina; cont2++) {
        let entity = this.televisores_total.shift();
        if (entity) entities.push(entity);
      }
      this.paginadores.push(
        new Paginador(
          cont,
          entities,
          total_de_entities,
          total_de_paginas,
          cont == 1,
          cont == total_de_paginas
        )
      );
    }
  }

  public inicializarPaginador() {
    this.paginador = this.paginadores[0];
  }

  public paginaAnterior(): void {
    let index = this.paginadores.indexOf(this.paginador);
    this.paginador = this.paginadores[index - 1];
  }
  public paginaSiguiente(): void {
    let index = this.paginadores.indexOf(this.paginador);
    this.paginador = this.paginadores[index + 1];
  }
}
