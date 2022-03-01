import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompartirEventoService {
  @Output() emitir_evento: EventEmitter<any>;

  constructor() {
    this.emitir_evento = new EventEmitter();
  }
}
