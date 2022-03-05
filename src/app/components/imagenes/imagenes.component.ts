import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { Multimedia } from '../../models/multimedia';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';
import { Paginador } from '../shared/paginacion_pequenia/paginador';
import { CompartirEventoService } from '../../services/compartir-evento.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styles: [],
})
export class ImagenesComponent implements OnInit {
  forma: FormGroup;
  multimedias_total: Multimedia[] = [];
  paginador: Paginador;
  cantidad_por_pagina: number = 3;
  @Output() multimediasEscogidas: EventEmitter<any>;

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private compartirEventoService: CompartirEventoService,
    private cdRef: ChangeDetectorRef
  ) {
    this.multimediasEscogidas = new EventEmitter();
  }
  // ngAfterViewChecked(): void {
  //   // this.compartirEventoService.emitir_evento.subscribe((paginador) => {
  //   //   this.paginador = paginador;
  //   // });
  //   this.cdRef.detectChanges();
  // }

  public capturarEvento(paginador) {
    this.paginador = paginador;
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.getMultimediasByClienteId();
  }

  public getMultimediasByClienteId() {
    this.activatedRoute.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];

      this.multimediaService
        .getMultimediasByClienteId(cliente_id)
        .subscribe((response) => {
          this.multimedias_total = response as Multimedia[];
        });
    });
  }

  verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }

  public getLabelAndFor(multimedia: Multimedia) {
    return `${multimedia.id}-${multimedia.archivo}`;
  }

  // Formulario
  private crearFormulario() {
    this.forma = this.fb.group({
      multimedias: this.fb.array([], Validators.required),
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

    // console.log(this.forma.getRawValue()['multimedias']);

    // this.televisorService
    //   .update_multimedias(this.id_televisor, this.forma.getRawValue())
    //   .subscribe((data) => {});
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

  public desmarcarTodo() {
    this.getIdsFormArray.clear();
  }

  public marcarTodo() {
    this.desmarcarTodo();
    this.paginador.entities.forEach((multimedia) => {
      this.getIdsFormArray.push(this.fb.control(multimedia));
    });
  }

  public onCheckboxChange(option, event, i) {
    if (event.target.checked) {
      this.getIdsFormArray.push(this.fb.control(option.id));
    } else {
      let arreglo: any[] = this.getIdsFormArray.getRawValue();

      // this.getIdsFormArray.removeAt(num);
      arreglo.forEach((multimedia_id) => {
        if (multimedia_id == option.id) {
          let num: number = arreglo.indexOf(multimedia_id);
          this.getIdsFormArray.removeAt(num);
        }
      });
    }
    this.multimediasEscogidas.emit(this.getIdsFormArray.getRawValue());
  }

  public validar(campo: string): boolean {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  public mensajeRequerido(campo: string): boolean {
    return this.forma.get(campo).errors.required;
  }
}
