import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Multimedia } from '../../models/multimedia';
import { MultimediaService } from '../../services/multimedia.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-eliminar-multimedias',
  templateUrl: './eliminar-multimedias.component.html',
  styleUrls: ['./eliminar-multimedias.component.css'],
})
export class EliminarMultimediasComponent implements OnInit {
  forma: FormGroup;
  multimedias: Multimedia[] = [];
  paginador_multimedias: any;
  cliente: Cliente;
  cargador: boolean = false;

  constructor(
    private multimediaService: MultimediaService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.crearFormulario();
    this.getClienteById();
  }

  public getClienteById(): void {
    this.activatedRoute.params.subscribe((params) => {
      let cliente_id = params['cliente_id'];

      this.clienteService.getClienteById(cliente_id).subscribe((response) => {
        this.cliente = response;
        this.loadingService.show();
        this.getMultimediasByClienteId(null);
      });
    });
  }

  public getMultimediasByClienteId(page) {
    this.multimediaService
      .getMultimediasByClienteIdWidthPagination(
        this.cliente.id,
        page ? page : 1
      )
      .subscribe((response) => {
        this.multimedias = response.multimedias as Multimedia[];
        this.paginador_multimedias = response.pageable;
        this.cargador = true;
      });
  }

  verArchivo(id: number): string {
    return this.multimediaService.verFoto(id);
  }

  public getLabelAndFor(multimedia: Multimedia) {
    return `${multimedia.id}-${multimedia.archivo}`;
  }

  // Formulario
  private crearFormulario() {
    this.forma = this.fb.group({
      multimedias: this.fb.array([], Validators.required),
    });
  }

  get getIdsFormArray(): FormArray {
    return this.forma.get('multimedias') as FormArray;
  }

  public salvar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: '¿Esta seguro de eliminar estas multimedias?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.multimediaService
          .deleteMultimediasByIds(this.forma.getRawValue())
          .subscribe((response) => {
            this.getMultimediasByClienteId(null);
            Swal.fire(
              'Borrado',
              'Las multimedias fueron eliminadas satisfactoriamente.',
              'success'
            );
          });
      }
    });
  }

  public marcarElCheckboxes(option): boolean {
    let arreglo: any[] = this.getIdsFormArray.getRawValue();
    let resp: boolean = false;
    arreglo.forEach((id) => {
      if (id == option.id) {
        resp = true;
      }
    });
    return resp;
  }

  public desmarcarTodo() {
    this.getIdsFormArray.clear();
  }

  public marcarTodo() {
    this.desmarcarTodo();
    this.multimedias.forEach((multimedia) => {
      this.getIdsFormArray.push(this.fb.control(multimedia));
    });
  }

  public onCheckboxChange(option, event, i) {
    if (event.target.checked) {
      this.getIdsFormArray.push(this.fb.control(option.id));
    } else {
      let arreglo: any[] = this.getIdsFormArray.getRawValue();

      arreglo.forEach((multimedia_id) => {
        if (multimedia_id == option.id) {
          let num: number = arreglo.indexOf(multimedia_id);
          this.getIdsFormArray.removeAt(num);
        }
      });
    }
  }

  public validar(campo: string): boolean {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  public mensajeRequerido(campo: string): boolean {
    return this.forma.get(campo).errors.required;
  }
}
