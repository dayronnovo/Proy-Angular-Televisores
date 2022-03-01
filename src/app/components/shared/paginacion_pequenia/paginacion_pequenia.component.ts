import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Paginador } from '../../../models/paginador';
import { Multimedia } from '../../../models/multimedia';
import { CompartirEventoService } from '../../../services/compartir-evento.service';

@Component({
  selector: 'app-paginacion-pequenia',
  templateUrl: './paginacion_pequenia.component.html',
  styleUrls: ['./paginacion_pequenia.component.css'],
})
export class PaginacionPequeniaComponent implements OnInit {
  @Input() multimedias_total: any[] = [];
  @Input() paginador: Paginador = null;
  @Input() cantidad_por_pagina: number;
  paginadores: Paginador[] = [];

  constructor(private compartirEventoService: CompartirEventoService) {}

  ngOnInit(): void {
    this.crearPaginador();
    this.inicializarPaginador();
  }

  public crearPaginador() {
    let total_de_entities: number = this.multimedias_total.length;
    let total_de_paginas: number = Math.ceil(
      total_de_entities / this.cantidad_por_pagina
    );

    for (let cont = 1; cont <= total_de_paginas; cont++) {
      let multimedias: Multimedia[] = [];
      for (let cont2 = 0; cont2 < this.cantidad_por_pagina; cont2++) {
        let multimedia = this.multimedias_total.shift();
        if (multimedia) multimedias.push(multimedia);
      }
      this.paginadores.push(
        new Paginador(
          cont,
          multimedias,
          total_de_entities,
          total_de_paginas,
          cont == 1,
          cont == total_de_paginas
        )
      );
    }
  }

  public inicializarPaginador() {
    this.compartirEventoService.emitir_evento.emit(this.paginadores[0]);
  }

  public paginaAnterior(): void {
    let index = this.paginadores.indexOf(this.paginador);
    this.paginador = this.paginadores[index - 1];
    this.compartirEventoService.emitir_evento.emit(this.paginador);
  }
  public paginaSiguiente(): void {
    let index = this.paginadores.indexOf(this.paginador);
    this.paginador = this.paginadores[index + 1];
    this.compartirEventoService.emitir_evento.emit(this.paginador);
  }
}
