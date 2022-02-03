import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  paginador: any;
  ruta = 'clientes';

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getClientesPorPagina();
  }

  public getClientesPorPagina() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page'); // El mas es para hacerlo un number
      if (!page) page = 0;

      this.clienteService
        .getClientesPorPagina(page)
        .subscribe((response: any) => {
          this.clientes = response.content as Cliente[];
          this.paginador = response.pageable;
        });
    });
  }
}
