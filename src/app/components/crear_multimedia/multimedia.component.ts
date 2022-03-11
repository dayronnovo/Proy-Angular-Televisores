import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import { MultimediaService } from '../../services/multimedia.service';
import { HttpEventType } from '@angular/common/http';
import { FileItem } from '../../models/file_item';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { CompartirEventoService } from '../../services/compartir-evento.service';
import { LoadingService } from '../../services/loading.service';

declare var $: any;
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
  tamanioImagenEnMB: number = 10;
  tamanioVideoEnMB: number = 80;
  mensaje_validacion: string;

  constructor(
    private multimediaService: MultimediaService,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private compartirEventoService: CompartirEventoService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.getCliente();
    this.lanzar_mensaje_de_validacion();
  }

  public getCliente() {
    this.activatedRoute.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];
      this.clienteService.getClienteById(cliente_id).subscribe((response) => {
        this.cliente = response;
      });
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
    this.clienteService
      .cargarArchivos(archivo.archivo, this.cliente.id)
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

  public prevenirImagenOpen(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  public lanzar_mensaje_de_validacion() {
    this.compartirEventoService.emitir_evento.subscribe((evento) => {
      this.cerrar_alerta();
      this.mensaje_validacion = evento;
    });
  }

  public cerrar_alerta() {
    setTimeout(() => {
      this.mensaje_validacion = null;
    }, 10000);
  }
}
