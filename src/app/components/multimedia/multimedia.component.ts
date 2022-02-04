import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import { MultimediaService } from '../../services/multimedia.service';
import { HttpEventType } from '@angular/common/http';
import { FileItem } from '../../models/file_item';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styles: [],
})
export class MultimediaComponent implements OnInit {
  televisores: Televisor[] = [];
  // loading: boolean = true;

  archivos: FileItem[] = [];
  estaSobreDrop: boolean = false;

  constructor(
    private televisorService: TelevisorService,
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerTelevisores();
  }

  public cargarArchivos() {
    this.archivos.forEach((archivo) => {
      this.cargarArchivosHelper(archivo);
    });
  }

  public limpiarArchivos() {
    this.archivos = [];
  }

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
}
