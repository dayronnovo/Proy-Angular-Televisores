import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute } from '@angular/router';
import { MultimediaService } from '../../services/multimedia.service';
import { Multimedia } from '../../models/multimedia';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styles: [],
})
export class DetallesClienteComponent implements OnInit {
  cliente: Cliente;
  multimedias: Multimedia[] = [];
  paginador: any;
  ruta: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private multimediaService: MultimediaService
  ) {
    this.getMultimediaByClienteId();
  }

  ngOnInit(): void {}

  public getMultimediaByClienteId() {
    this.activatedRoute.params.subscribe((params) => {
      let id: number = +params['id'];
      let page: number = +params['page'];

      if (!page) page = 0;
      this.multimediaService
        .getMultimediaByClienteId(id, page)
        .subscribe((response: any) => {
          this.cliente = response.content.cliente as Cliente;
          this.multimedias = response.content.multimedias as Multimedia[];
          this.paginador = response.pageable;
          this.ruta = `cliente/detalles/${id}`;
        });
    });
  }
}
