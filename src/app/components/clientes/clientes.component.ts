import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor() {}

  ngOnInit(): void {}
}
