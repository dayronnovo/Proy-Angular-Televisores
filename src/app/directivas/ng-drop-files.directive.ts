import { FileItem } from '../models/file_item';
import { CompartirEventoService } from '../services/compartir-evento.service';
import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  extensiones_videos_permitidas: string[] = ['mp4', 'webm', 'ogg'];
  constructor(private compartirEventoService: CompartirEventoService) {}
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Input() tamanioImagenEnMB: number;
  @Input() tamanioVideoEnMB: number;

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.prevenirImagenOpen(event);
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeaver(event: any) {
    this.mouseSobre.emit(false);
  }
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this.getTransferencia(event);

    if (!transferencia) return;

    this.extraerarchivos(transferencia.files);
    this.prevenirImagenOpen(event);
    this.mouseSobre.emit(false);
  }

  public getTransferencia(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private extraerarchivos(archivosList: FileList) {
    // console.log(archivosList);
    for (const propiedad in Object.getOwnPropertyNames(archivosList)) {
      const archivoTemp = archivosList[propiedad];
      if (this.archivoPuedeSerCargado(archivoTemp)) {
        const nuevoArchivo = new FileItem(archivoTemp);

        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }

  // Validaciones
  private archivoPuedeSerCargado(archivo: File): boolean {
    if (
      !this.yaFueDroppeado(archivo.name) &&
      this.validarTipoDeArchivo(archivo.type) &&
      this.validarTamanioDeArhivo(archivo)
    ) {
      console.log('VAlidacion');
      return true;
    } else return false;
  }

  private validarTamanioDeArhivo(archivo: File): boolean {
    let result: boolean = false;
    if (archivo.type.startsWith('image')) {
      result = this.tamanioImagenEnMB > archivo.size / 1024 / 1024;
      if (!result) {
        this.emitir_error_de_validacion(
          `El tamaño maximo de las imagenes es de ${this.tamanioImagenEnMB} MB.`
        );
      }
      return result;
    } else if (archivo.type.startsWith('video')) {
      result = this.tamanioVideoEnMB > archivo.size / 1024 / 1024;
      if (!result) {
        this.emitir_error_de_validacion(
          `El tamaño maximo de los videos es de ${this.tamanioVideoEnMB} MB.`
        );
      }
      return result;
    }
  }
  // Prevenir que al soltar la imagen al drop el buscador no la abra.
  private prevenirImagenOpen(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private yaFueDroppeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log(`El archivo ${nombreArchivo} ya esta agregado.`);
        this.emitir_error_de_validacion(
          `El archivo ${nombreArchivo} ya esta agregado.`
        );
        return true;
      }
    }
    return false;
  }

  private validarTipoDeArchivo(tipoArchivo: string): boolean {
    let result =
      tipoArchivo === '' || tipoArchivo === undefined
        ? false
        : tipoArchivo.startsWith('image') || tipoArchivo.startsWith('video');

    if (!result) {
      this.emitir_error_de_validacion('Solo pueden ser imagenes y videos.');
      return result;
    }

    if (tipoArchivo.startsWith('video'))
      result = this.validarExtensionDeVideo(tipoArchivo);
    return result;
  }

  private validarExtensionDeVideo(tipoArchivo) {
    let extension = tipoArchivo.split('/')[1];
    let re = this.extensiones_videos_permitidas.includes(extension);
    if (!re) {
      this.emitir_error_de_validacion(
        'Los formatos de video permitidos son MP4, WEBM y OGG'
      );
    }
    return re;
  }

  public emitir_error_de_validacion(mensaje) {
    this.compartirEventoService.emitir_evento.emit(mensaje);
  }
}
