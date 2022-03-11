import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CronogramaService } from '../../services/cronograma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialCronograma } from '../../models/historial_cronograma';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Paginador } from '../shared/paginacion_pequenia/paginador';
import { CompartirEventoService } from '../../services/compartir-evento.service';
import { Televisor } from '../../models/televisores';
import { TelevisorService } from '../../services/televisor.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-revisar-cronograma',
  templateUrl: './revisar-cronograma.component.html',
  styles: [],
})
export class RevisarCronogramaComponent implements OnInit {
  historialCronograma: HistorialCronograma[] = [];
  // actualReproduciendo: HistorialCronograma;
  paginador: any;
  ruta: string = null;
  // cliente_id: number;
  cliente: Cliente;
  fechaActual: string = new Date().toISOString().split('T')[0];
  forma: FormGroup;
  cargador: boolean = false;

  // Paginador de los televisores
  paginador_pequenio: Paginador;
  cantidad_por_pagina: number = 1;
  paginadores: Paginador[] = [];
  televisores_total: Televisor[] = [];

  constructor(
    private cronogramaService: CronogramaService,
    private televisorService: TelevisorService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private compartirEventoService: CompartirEventoService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.crearFormulario();
    this.getClienteById();
  }

  // public capturar_evento(paginador, historial) {
  //   historial.paginador_televisores = paginador;
  //   this.cdRef.detectChanges();
  // }

  crearFormulario() {
    this.forma = this.fb.group({
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
          this.cargador = true;
        });
    });
  }

  public eliminarReproduccion(historial) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro de eliminar un historial?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        clearTimeout(historial.timeId);
        this.cronogramaService.delete(historial.id).subscribe((response) => {
          this.getProgramacion();
          Swal.fire(
            'Borrado',
            'El historial fue eliminado satisfactoriamente',
            'success'
          );
        });
      }
    });
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
          console.log(this.historialCronograma);
          this.paginador = data.pageable;
        });
    }
  }

  public getTelevisoresByhistorialIdWithPagination(
    page: number,
    historial: HistorialCronograma
  ): void {
    this.televisorService
      .getTelevisoresByhistorialIdWithPagination(historial.id, page)
      .subscribe((response) => {
        historial.televisores_pagination = response;
      });
  }
}
