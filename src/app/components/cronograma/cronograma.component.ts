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
  televisor: Televisor;

  constructor(
    private televisorService: TelevisorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTelevisorAndClienteByTelevisorId();
  }

  public getTelevisorAndClienteByTelevisorId() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['televisor_id'];
      this.televisorService
        .getTelevisorAndClienteByTelevisorId(id)
        .subscribe((data) => {
          this.televisor = data;
        });
    });
  }
}
