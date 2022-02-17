import { Component, OnInit } from '@angular/core';
import { Multimedia } from '../../models/multimedia';
import { Televisor } from '../../models/televisores';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { TelevisorService } from '../../services/televisor.service';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styles: [],
})
export class ImagenesComponent implements OnInit {
  multimedias: Multimedia[] = [];
  forma: FormGroup;
  // id_televisor: number;
  // televisor: Televisor;
  // cliente: Cliente;

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMultimediasByTelevisorId();
    this.crearFormulario();
  }

  public getMultimediasByTelevisorId() {
    this.activatedRoute.parent.params.subscribe((params) => {
      let id = params['televisor_id'];
      this.multimediaService
        .get_imagenes_by_televisor_id(id)
        .subscribe((response) => {
          this.multimedias = response.multimedias as Multimedia[];
        });
    });
  }

  verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }

  // Formulario
  private crearFormulario() {
    this.forma = this.fb.group({
      multimedias: this.fb.array([], Validators.required),
      hora: [''],
    });
  }

  get getIdsFormArray(): FormArray {
    return this.forma.get('multimedias') as FormArray;
  }

  public salvar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    // console.log(this.forma.getRawValue()['multimedias']);
    let horaForm: number = this.forma.getRawValue()['hora'];
    console.log(horaForm);
    let horaActual: Date = new Date();
    let hora = horaActual.getHours();
    let minuto = horaActual.getMinutes();
    console.log(`${hora}:${minuto}`);

    // this.televisorService
    //   .update_multimedias(this.id_televisor, this.forma.getRawValue())
    //   .subscribe((data) => {});
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
    this.multimedias.forEach((multimedia) => {
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
