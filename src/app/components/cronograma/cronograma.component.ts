import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Multimedia } from '../../models/multimedia';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styles: [],
})
export class CronogramaComponent implements OnInit {
  cliente: Cliente;
  televisores: Televisor[] = [];
  formad: FormGroup;
  multimedias: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private televisorService: TelevisorService,
    private fb: FormBuilder
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
        this.televisores = response as Televisor[];
      });
  }

  // Formulario
  private crearFormulario() {
    this.formad = this.fb.group({
      televisores: this.fb.array([], Validators.required),
      hora: [],
    });
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

    // console.log(this.forma.getRawValue()['multimedias']);
    let horaForm: number = this.formad.getRawValue()['hora'];
    console.log(horaForm);
    let horaActual: Date = new Date();
    let hora = horaActual.getHours();
    let minuto = horaActual.getMinutes();
    console.log(`${hora}:${minuto}`);

    // this.televisorService
    //   .update_multimedias(this.id_televisor, this.forma.getRawValue())
    //   .subscribe((data) => {});
  }

  public getMultimediasDesdeImagenesComponent(multimedias: Multimedia[]) {
    this.multimedias = multimedias;
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
      this.getIdsFormArray.push(this.fb.control(option));
    } else {
      let arreglo: any[] = this.getIdsFormArray.getRawValue();

      // this.getIdsFormArray.removeAt(num);
      arreglo.forEach((televisor) => {
        if (televisor.id == option.id) {
          let num: number = arreglo.indexOf(televisor);
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
}
