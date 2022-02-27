import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-televisor',
  templateUrl: './crear-televisor.component.html',
  styleUrls: ['./crear-televisor.component.css'],
})
export class CrearTelevisorComponent implements OnInit {
  cliente_id: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cliente_id = params['cliente_id'];
    });
  }
}
