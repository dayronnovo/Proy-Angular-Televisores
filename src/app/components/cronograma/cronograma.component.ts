import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { TelevisorService } from '../../services/televisor.service';
import { Televisor } from '../../models/televisores';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styles: [],
})
export class CronogramaComponent implements OnInit {
  cliente: Cliente;
  televisores: Televisor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private televisorService: TelevisorService
  ) {}

  ngOnInit(): void {
    this.getClienteById();
  }

  public getClienteById() {
    this.activatedRoute.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];
      this.clienteService.getClienteById(cliente_id).subscribe((response) => {
        this.cliente = response;
        this.getTelevisoresByClienteId();
      });
    });
  }

  public getTelevisoresByClienteId() {
    this.televisorService
      .getTelevisoresByClienteId(this.cliente.id)
      .subscribe((response) => {
        this.televisores = response as Televisor[];
      });
  }
}
