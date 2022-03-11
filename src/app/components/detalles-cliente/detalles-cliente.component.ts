import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute } from '@angular/router';
import { MultimediaService } from '../../services/multimedia.service';
import { Multimedia } from '../../models/multimedia';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';
import { LoadingService } from '../../services/loading.service';

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
  cargador: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private televisorService: TelevisorService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.getClienteById();
  }

  public getClienteById() {
    const cliente_id = +this.activatedRoute.snapshot.params['cliente_id'];
    this.clienteService.getClienteById(cliente_id).subscribe((response) => {
      this.cliente = response;
      this.loadingService.show();
      this.getTelevisoresByClienteId();
    });
  }
  public getTelevisoresByClienteId() {
    this.activatedRoute.params.subscribe((params) => {
      let page: number = params['page'];

      if (!page) page = 0;
      this.televisorService
        .getTelevisoresByClienteIdWithPagination(this.cliente.id, page)
        .subscribe((response: any) => {
          this.televisores = response.televisores as Televisor[];
          this.paginador = response.pageable;
          this.ruta = `cliente/detalles/${this.cliente.id}`;
          this.cargador = true;
        });
    });
  }
}
