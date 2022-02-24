import { Component, OnInit } from '@angular/core';
import { TelevisorService } from '../../services/televisor.service';
import { CronogramaService } from '../../services/cronograma.service';
import { ActivatedRoute } from '@angular/router';
import { HistorialCronograma } from '../../models/historial_cronograma';
import { Multimedia } from '../../models/multimedia';

@Component({
  selector: 'app-revisar-cronograma',
  templateUrl: './revisar-cronograma.component.html',
  styles: [],
})
export class RevisarCronogramaComponent implements OnInit {
  historialCronograma: HistorialCronograma[] = [];
  actualReproduciendo: HistorialCronograma;
  paginador: any;
  ruta: string = null;

  constructor(
    private cronogramaService: CronogramaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProgramacion();
  }

  public getProgramacion() {
    this.activatedRoute.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];
      this.ruta = `historial/${cliente_id}`;
      let page = params['page'];
      if (!page) page = 0;

      this.cronogramaService
        .getCronogramaByClienteIdWithPagination(cliente_id, page)
        .subscribe((data) => {
          this.historialCronograma = data.historiales;
          this.paginador = data.pageable;
        });
    });
  }

  public eliminarReproduccion(timeId) {
    clearTimeout(timeId);
  }

  public compararHora(hora): boolean {
    let horaActual = new Date();
    let hora_actual_string = `${horaActual.getHours()}:${
      horaActual.getMinutes().toString().length == 1
        ? `0${horaActual.getMinutes()}`
        : `${horaActual.getMinutes()}`
    }`;
    return hora > hora_actual_string;
  }

  // public reproduciendoActualmente(
  //   cronograma: HistorialCronograma,
  //   index
  // ): boolean {
  //   let horaActual = new Date();
  //   let hora_actual_string = `${horaActual.getHours()}:${
  //     horaActual.getMinutes().toString().length == 1
  //       ? `0${horaActual.getMinutes()}`
  //       : `${horaActual.getMinutes()}`
  //   }`;

  //   let historialSiguiente =
  //     this.historialCronograma[index + 1]?.hora_de_inicio;

  //   if (historialSiguiente) {
  //     return (
  //       hora_actual_string > cronograma?.hora_de_inicio &&
  //       hora_actual_string < historialSiguiente
  //     );
  //   } else {
  //     return hora_actual_string > cronograma?.hora_de_inicio;
  //   }
  // }
}
