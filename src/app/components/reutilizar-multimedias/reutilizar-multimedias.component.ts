import { Component, OnInit } from '@angular/core';
import { Multimedia } from '../../models/multimedia';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { TelevisorService } from '../../services/televisor.service';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';
import { Televisor } from '../../models/televisores';

@Component({
  selector: 'app-reutilizar-multimedias',
  templateUrl: './reutilizar-multimedias.component.html',
  styles: [],
})
export class ReutilizarMultimediasComponent implements OnInit {
  multimediasActuales: Multimedia[] = [];
  multimediasDelCliente: Multimedia[] = [];
  id_televisor: number;
  televisor: Televisor;
  forma: FormGroup;
  cliente: Cliente;

  constructor(
    private televisorService: TelevisorService,
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMultimediasActuales();
    this.crearFormulario();
  }

  public getMultimediasActuales() {
    this.activatedRoute.params.subscribe((params) => {
      this.id_televisor = params['id'];
      this.televisorService
        .getMultimediasByTelevisorId(this.id_televisor)
        .subscribe((response) => {
          this.cliente = response.cliente as Cliente;
          this.multimediasActuales = response.multimedias as Multimedia[];
          this.televisor = response.televisor as Televisor;
          this.getMultimediasByClienteId();
        });
    });
  }

  public getMultimediasByClienteId() {
    this.multimediaService
      .getMultimediasByClienteId(this.cliente.id)
      .subscribe((response) => {
        this.multimediasDelCliente = response as Multimedia[];
        // console.log(this.multimediasDelCliente);
        this.cargarDataAlFormulario();
      });
  }

  verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }

  // Formulario
  private crearFormulario() {
    this.forma = this.fb.group({
      ids: this.fb.array([], Validators.required),
    });
  }

  get getIdsFormArray(): FormArray {
    return this.forma.get('ids') as FormArray;
  }

  public salvar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.televisorService
      .update_multimedias(this.id_televisor, this.forma.getRawValue())
      .subscribe((data) => {});
  }

  public cargarDataAlFormulario() {
    this.multimediasActuales.forEach((multimedia) => {
      this.getIdsFormArray.push(this.fb.control(multimedia));
    });
  }

  public marcarElCheckboxes(option): boolean {
    let arreglo: any[] = this.getIdsFormArray.getRawValue();
    let resp: boolean = false;
    arreglo.forEach((multimedia) => {
      if (multimedia.id == option.id) {
        resp = true;
      }
    });
    return resp;
  }

  public desmarcarTodo() {
    this.getIdsFormArray.clear();
  }

  public marcarTodo() {
    this.desmarcarTodo();
    this.multimediasDelCliente.forEach((multimedia) => {
      this.getIdsFormArray.push(this.fb.control(multimedia));
    });
  }

  public onCheckboxChange(option, event, i) {
    if (event.target.checked) {
      this.getIdsFormArray.push(this.fb.control(option));
    } else {
      let arreglo: any[] = this.getIdsFormArray.getRawValue();

      // this.getIdsFormArray.removeAt(num);
      arreglo.forEach((multimedia) => {
        if (multimedia.id == option.id) {
          let num: number = arreglo.indexOf(multimedia);
          this.getIdsFormArray.removeAt(num);
        }
      });
    }
  }

  public validar(campo: string): boolean {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  public mensajeRequerido(campo: string): boolean {
    return this.forma.get(campo).errors.required;
  }
}
