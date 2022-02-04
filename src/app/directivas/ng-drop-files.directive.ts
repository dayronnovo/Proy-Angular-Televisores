import { FileItem } from '../models/file_item';
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
  constructor() {}
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

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
    if (!this.yaFueDroppeado(archivo.name) && this.esImagen(archivo.type)) {
      return true;
    } else return false;
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
        return true;
      }
    }
    return false;
  }

  private esImagen(tipoArchivo: string): boolean {
    return tipoArchivo === '' || tipoArchivo === undefined
      ? false
      : tipoArchivo.startsWith('image');
  }
}
