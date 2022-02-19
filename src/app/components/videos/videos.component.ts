import { Component, OnInit, Input } from '@angular/core';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Multimedia } from '../../models/multimedia';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styles: [],
})
export class VideosComponent implements OnInit {
  multimedia: Multimedia;
  @Input() cliente: Cliente;
  forma: FormGroup;

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMultimediasByClienteId();
    this.crearFormulario();
  }

  public getMultimediasByClienteId() {
    this.activatedRoute.parent.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];
      // let televisor_id = params['televisor_id'];
      this.multimediaService
        .get_videos_by_cliente_id(cliente_id)
        .subscribe((response) => {
          console.log(response[0]);
          this.multimedia = response[0] as Multimedia;
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

    // console.log(this.forma.getRawValue()['multimedias']);

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
