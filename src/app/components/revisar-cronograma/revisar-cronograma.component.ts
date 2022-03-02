import { Component, OnInit } from '@angular/core';
import { CronogramaService } from '../../services/cronograma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialCronograma } from '../../models/historial_cronograma';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

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
  // cliente_id: number;
  cliente: Cliente;
  fechaActual: string = new Date().toISOString().split('T')[0];
  forma: FormGroup;

  constructor(
    private cronogramaService: CronogramaService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.getClienteById();
    console.log('ngOnInit');
  }

  crearFormulario() {
    this.forma = this.fb.group({
      // fecha: ['2022-02-22', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  public getClienteById() {
    let cliente_id = this.activatedRoute.snapshot.params['cliente_id'];

    this.clienteService.getClienteById(cliente_id).subscribe((data) => {
      this.cliente = data;
      this.ruta = `historial/${this.cliente.id}`;
      this.getProgramacion();
    });
  }

  public getProgramacion() {
    console.log('GetProgramacion');
    this.activatedRoute.params.subscribe((params) => {
      let page = params['page'];
      if (!page) page = 0;

      this.cronogramaService
        .getCronogramaByClienteIdWithPagination(
          this.cliente.id,
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
    let page = this.activatedRoute.snapshot.params['page'];
    if (page > 1)
      this.router.navigate(['/historial', this.cliente.id, 'page', 1]);
    else {
      this.cronogramaService
        .getCronogramaByClienteIdWithPagination(
          this.cliente.id,
          1,
          this.forma.getRawValue()
        )
        .subscribe((data) => {
          this.historialCronograma = data.historiales;
          this.paginador = data.pageable;
        });
    }

    // console.log('BuscarPorFecha');
    // this.router.navigate(['/historial', this.cliente.id, 'page', 1]);
    // this.cronogramaService
    //   .getCronogramaByClienteIdWithPagination(
    //     this.cliente.id,
    //     1,
    //     this.forma.getRawValue()
    //   )
    //   .subscribe((data) => {
    //     this.historialCronograma = data.historiales;
    //     this.paginador = data.pageable;
    //   });
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
