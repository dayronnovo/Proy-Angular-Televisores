import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import { MultimediaService } from '../../services/multimedia.service';
import { HttpEventType } from '@angular/common/http';
import { FileItem } from '../../models/file_item';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css'],
})
export class MultimediaComponent implements OnInit {
  // loading: boolean = true;

  archivos: FileItem[] = [];
  estaSobreDrop: boolean = false;
  televisores: Televisor[] = [];
  cliente: Cliente;
  forma: FormGroup;

  constructor(
    private televisorService: TelevisorService,
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.obtenerTelevisores();
    this.crearFormulario();
  }

  ngOnInit(): void {}

  obtenerTelevisores() {
    this.activatedRoute.params.subscribe((params) => {
      let id: number = params['id'];
      // console.log(id);
      this.televisorService.getTelevisoresByClienteId(id).subscribe(
        (response) => {
          this.cliente = response.cliente as Cliente;
          this.televisores = response.televisores as Televisor[];
          // this.verFoto();
          // this.loading = false;
        },
        (err) => {
          // Swal.fire('Ocurrio un error', `${err.error.mensaje}`, 'error');
        }
      );
    });
  }

  public cargarArchivos() {
    this.archivos.forEach((archivo) => {
      this.cargarArchivosHelper(archivo);
    });
  }

  public limpiarArchivos() {
    this.archivos = [];
  }
  private cargarArchivosHelper(archivo: FileItem) {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.multimediaService
      .cargarArchivos(archivo.archivo, this.forma.getRawValue())
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          archivo.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          // this.cliente = response.cliente as Cliente;
          // Swal.fire('Upload', `${response.mensaje}`, 'success');
        }
      });
  }

  // Formulario Select
  private crearFormulario() {
    this.forma = this.fb.group({
      ids: this.fb.array([], Validators.required),
    });
  }

  get getIdsFormArray(): FormArray {
    return this.forma.get('ids') as FormArray;
  }

  public guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
  }

  public onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.getIdsFormArray.push(this.fb.control(option));
    } else {
      let arreglo: any[] = this.getIdsFormArray.getRawValue();
      let num: number = arreglo.indexOf(option);
      this.getIdsFormArray.removeAt(num);
    }
  }

  public prevenirImagenOpen(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  public validar(campo: string): boolean {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  public mensajeRequerido(campo: string): boolean {
    return this.forma.get(campo).errors.required;
  }
}
