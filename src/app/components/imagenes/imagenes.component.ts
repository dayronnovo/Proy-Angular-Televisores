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
  multimedias: Multimedia[] = [];
  paginador_multimedias: any;
  @Output() multimediasEscogidas: EventEmitter<any>;

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.multimediasEscogidas = new EventEmitter();
  }
  // ngAfterViewChecked(): void {
  //   // this.compartirEventoService.emitir_evento.subscribe((paginador) => {
  //   //   this.paginador = paginador;
  //   // });
  //   this.cdRef.detectChanges();
  // }

  // public capturarEvento(paginador) {
  //   this.paginador = paginador;
  //   this.cdRef.detectChanges();
  // }

  ngOnInit(): void {
    this.crearFormulario();
    this.getMultimediasByClienteId(null);
  }

  public getMultimediasByClienteId(page) {
    this.activatedRoute.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];

      this.multimediaService
        .getMultimediasByClienteIdWidthPagination(cliente_id, page ? page : 1)
        .subscribe((response) => {
          this.multimedias = response.multimedias as Multimedia[];
          this.paginador_multimedias = response.pageable;
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
    this.multimedias.forEach((multimedia) => {
      this.getIdsFormArray.push(this.fb.control(multimedia));
    });
  }

  public onCheckboxChange(option, event, i) {
    if (event.target.checked) {
      this.getIdsFormArray.push(this.fb.control(option.id));
    } else {
      let arreglo: any[] = this.getIdsFormArray.getRawValue();

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
