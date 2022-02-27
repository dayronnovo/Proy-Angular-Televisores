import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute } from '@angular/router';
import { MultimediaService } from '../../services/multimedia.service';
import { Multimedia } from '../../models/multimedia';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styles: [],
})
export class DetallesClienteComponent implements OnInit {
  cliente: Cliente;
  televisores: Televisor[] = [];
  paginador: any;
  ruta: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private televisorService: TelevisorService
  ) {
    this.getTelevisoresByClienteId();
  }

  ngOnInit(): void {}

  public getTelevisoresByClienteId() {
    this.activatedRoute.params.subscribe((params) => {
      let id: number = +params['id'];
      let page: number = +params['page'];

      if (!page) page = 0;
      this.televisorService
        .getTelevisoresByClienteIdWithPagination(id, page)
        .subscribe((response: any) => {
          this.cliente = response.content.cliente as Cliente;
          this.televisores = response.content.televisores as Televisor[];
          this.paginador = response.pageable;
          this.ruta = `cliente/detalles/${id}`;
        });
    });
  }
}
