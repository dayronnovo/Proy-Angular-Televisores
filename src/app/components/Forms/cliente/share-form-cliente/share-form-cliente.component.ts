import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../../../../models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-form-cliente',
  templateUrl: './share-form-cliente.component.html',
  styleUrls: ['./share-form-cliente.component.css'],
})
export class ShareFormClienteComponent implements OnInit {
  cliente: Cliente;
  @Input() idDelCliente: number;
  forma: FormGroup;
  erroresValidaciones: string[];
  cargador: boolean = true;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.cliente = new Cliente();
    // this.crearFormulario();
    // this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
    this.idDelCliente != null ? this.getClienteById() : (this.cargador = false);
    // this.getClienteById();
    this.crearFormulario();
  }

  getClienteById() {
    this.clienteService.getClienteById(this.idDelCliente).subscribe(
      (response) => {
        this.cliente = response;
        this.cargarDataAlFormulario();
        this.cargador = false;
      },
      (err) => {
        Swal.fire(
          'Error',
          `No se enconcontro ningun cliente con el id: ${this.idDelCliente}`,
          'error'
        );
        this.router.navigate(['/clientes']);
      }
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
  }

  cargarDataAlFormulario() {
    if (!this.cliente.id) return;

    this.forma.reset({
      id: this.cliente.id,
      nombre: this.cliente.nombre,
    });
  }

  guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    if (this.cliente.id == null) {
      this.clienteService.create(this.forma.getRawValue()['nombre']).subscribe(
        (response) => {
          this.router.navigate(['/clientes']);
          Swal.fire('', `Cliente creado con exito`, 'success');
        },
        (err) => {
          Swal.fire(
            '',
            'Ocurrio un error al intentar crear el cliente',
            'error'
          );
        }
      );
    } else {
      this.clienteService.update(this.forma.getRawValue()).subscribe(
        (response) => {
          this.router.navigate(['/clientes']);
          Swal.fire('', `Cliente actualizado con exito`, 'success');
        },
        (err) => {
          console.log(err);
          if (err.status == 400) {
            this.erroresValidaciones = err.error.errores;
          } else {
            Swal.fire(
              '',
              'Ocurrio un error al intentar actualizar el cliente',
              'error'
            );
          }
        }
      );
    }
  }

  //validaciones
  validar(campo: string): boolean {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }
  mensajeRequerido(campo: string): boolean {
    return this.forma.get(campo).errors.required;
  }
  mensajePattern(campo: string) {
    return this.forma.get(campo).errors.pattern;
  }
}
