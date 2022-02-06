import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import { MultimediaService } from '../../services/multimedia.service';
import { HttpEventType } from '@angular/common/http';
import { FileItem } from '../../models/file_item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styles: [],
})
export class MultimediaComponent implements OnInit {
  // loading: boolean = true;

  archivos: FileItem[] = [];
  estaSobreDrop: boolean = false;
  televisores: Televisor[] = [];
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
          this.televisores = response;
          console.log(this.televisores);
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
    // console.log(this.nombreFoto.length);
    this.multimediaService
      .cargarArchivos(archivo.archivo)
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
      ids: ['', Validators.required],
    });
  }

  public guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    return;
  }
}
