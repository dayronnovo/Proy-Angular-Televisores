import { Component, OnInit } from '@angular/core';
import { CronogramaService } from '../../services/cronograma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialCronograma } from '../../models/historial_cronograma';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  cliente_id: number;
  fechaActual: string = new Date().toISOString().split('T')[0];
  forma: FormGroup;

  constructor(
    private cronogramaService: CronogramaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.getProgramacion();
  }

  crearFormulario() {
    this.forma = this.fb.group({
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  public getProgramacion() {
    this.activatedRoute.params.subscribe((params) => {
      this.cliente_id = params['cliente_id'];
      this.ruta = `historial/${this.cliente_id}`;
      let page = params['page'];
      if (!page) page = 0;

      this.cronogramaService
        .getCronogramaByClienteIdWithPagination(
          this.cliente_id,
          page,
          this.forma.getRawValue()
        )
        .subscribe((data) => {
          this.historialCronograma = data.historiales;
          this.paginador = data.pageable;
        });
    });
  }

  public eliminarReproduccion(timeId) {
    clearTimeout(timeId);
  }

  public compararFechaAndHora(historial: HistorialCronograma): boolean {
    let fechaActual = new Date().toISOString().split('T')[0];
    if (fechaActual > historial.fecha) return false;

    let horaActual = new Date();
    let hora_actual_string = `${horaActual.getHours()}:${
      horaActual.getMinutes().toString().length == 1
        ? `0${horaActual.getMinutes()}`
        : `${horaActual.getMinutes()}`
    }`;
    return historial.hora_de_inicio > hora_actual_string;
  }

  public buscarPorFecha() {
    this.router.navigate(['/historial', this.cliente_id, 'page', 1]);
    this.getProgramacion();
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
