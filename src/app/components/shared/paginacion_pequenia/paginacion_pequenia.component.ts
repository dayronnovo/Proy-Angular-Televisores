import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Paginador } from './paginador';
import { CompartirEventoService } from '../../../services/compartir-evento.service';

@Component({
  selector: 'app-paginacion-pequenia',
  templateUrl: './paginacion_pequenia.component.html',
  styleUrls: ['./paginacion_pequenia.component.css'],
})
export class PaginacionPequeniaComponent implements OnInit {
  @Input() paginador: any;

  @Output() emitir_evento_del_paginador: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    // console.log(this.paginador);
  }

  public paginaSiguiente(): void {
    this.emitir_evento_del_paginador.emit(this.paginador.number + 2);
  }
  public paginaAnterior(): void {
    this.emitir_evento_del_paginador.emit(this.paginador.number);
  }
}
