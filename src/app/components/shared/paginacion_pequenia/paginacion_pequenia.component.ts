import { Component, Input, OnInit } from '@angular/core';
import { Paginador } from '../../../models/paginador';
import { CompartirEventoService } from '../../../services/compartir-evento.service';

@Component({
  selector: 'app-paginacion-pequenia',
  templateUrl: './paginacion_pequenia.component.html',
  styleUrls: ['./paginacion_pequenia.component.css'],
})
export class PaginacionPequeniaComponent implements OnInit {
  @Input() entities_total: any[] = [];
  @Input() paginador: Paginador = null;
  @Input() cantidad_por_pagina: number;
  paginadores: Paginador[] = [];

  constructor(private compartirEventoService: CompartirEventoService) {}

  ngOnInit(): void {
    this.crearPaginador();
    this.inicializarPaginador();
  }

  public crearPaginador() {
    let total_de_entities: number = this.entities_total.length;
    let total_de_paginas: number = Math.ceil(
      total_de_entities / this.cantidad_por_pagina
    );

    for (let cont = 1; cont <= total_de_paginas; cont++) {
      let entities: any[] = [];
      for (let cont2 = 0; cont2 < this.cantidad_por_pagina; cont2++) {
        let entity = this.entities_total.shift();
        if (entity) entities.push(entity);
      }
      this.paginadores.push(
        new Paginador(
          cont,
          entities,
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
