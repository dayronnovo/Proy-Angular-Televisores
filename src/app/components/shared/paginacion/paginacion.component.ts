import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css'],
})
export class PaginacionComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  paginas: number[];
  desde: number;
  hasta: number;

  @Input() componente: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initPaginador();
    console.log(this.componente);
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes['paginador'];
    if (paginadorActualizado.previousValue) {
      this.initPaginador();
    }
  }

  initPaginador(): void {
    if (this.paginador.totalPages > 3) {
      if (this.paginador.number < 2) {
        this.desde = 1;
        this.hasta = 3;
      } else {
        this.desde = this.paginador.number;
        this.hasta = this.paginador.number + 2;
      }
      if (this.paginador.number > this.paginador.totalPages - 3) {
        console.log(this.paginador.number);
        this.desde = this.paginador.totalPages - 2;
        this.hasta = this.paginador.totalPages;
      }
      this.paginas = new Array(this.hasta - this.desde + 1)
        .fill(0)
        .map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages)
        .fill(0)
        .map((valor, indice) => indice + 1);
    }
  }

  public paginaAnterior(): void {
    this.router.navigate([
      `/${this.componente}/page`,
      this.paginador.number - 1,
    ]);
  }
  public paginaSiguiente(): void {
    this.router.navigate([
      `/${this.componente}/page`,
      this.paginador.number + 2,
    ]);
  }
  public primeraPagina(): void {
    this.router.navigate([`/${this.componente}/page`, 1]);
  }
  public ultimaPagina(): void {
    this.router.navigate([
      `/${this.componente}/page`,
      this.paginador.totalPages,
    ]);
  }
  public irAlaPaginaNumeracion(page: number): void {
    this.router.navigate([`/${this.componente}/page`, page]);
  }
}
