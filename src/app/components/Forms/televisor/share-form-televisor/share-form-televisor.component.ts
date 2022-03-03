import { Component, OnInit, Input } from '@angular/core';
import { Televisor } from '../../../../models/televisores';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TelevisorService } from '../../../../services/televisor.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-share-form-televisor',
  templateUrl: './share-form-televisor.component.html',
  styleUrls: ['./share-form-televisor.component.css'],
})
export class ShareFormTelevisorComponent implements OnInit {
  televisor: Televisor;
  @Input() televisor_id: number;
  @Input() cliente_id: number;
  forma: FormGroup;
  erroresValidaciones: string[];
  cargador: boolean = true;

  constructor(
    private televisorService: TelevisorService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.televisor = new Televisor();
    // this.crearFormulario();
    // this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
    this.televisor_id != null
      ? this.getTelevisorById()
      : (this.cargador = false);
    // this.getTelevisorById();
    this.crearFormulario();
  }

  public getTelevisorById() {
    this.televisorService
      .getTelevisorAndClienteByTelevisorId(this.televisor_id)
      .subscribe(
        (response) => {
          this.televisor = response;
          this.cargarDataAlFormulario();
          this.cargador = false;
        },
        (err) => {
          Swal.fire(
            'Error',
            `No se enconcontro ningun televisor con el id: ${this.televisor_id}`,
            'error'
          );
          this.router.navigate(['/cliente/detalles']);
        }
      );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id: [''],
      ubicacion: ['', Validators.required],
    });
  }

  cargarDataAlFormulario() {
    if (!this.televisor.id) return;

    this.forma.reset({
      id: this.televisor.id,
      ubicacion: this.televisor.ubicacion,
    });
  }

  guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    if (this.televisor.id == null) {
      this.televisorService
        .create(this.forma.getRawValue()['ubicacion'], this.cliente_id)
        .subscribe(
          (response) => {
            this.router.navigate(['/cliente/detalles', this.cliente_id]);
            Swal.fire('', `Televisor creado con exito`, 'success');
          },
          (err) => {
            Swal.fire(
              '',
              'Ocurrio un error al intentar crear el Televisor',
              'error'
            );
          }
        );
    } else {
      this.televisorService.update(this.forma.getRawValue()).subscribe(
        (response) => {
          this.router.navigate(['/clientes']);
          Swal.fire('', `Televisor actualizado con exito`, 'success');
        },
        (err) => {
          console.log(err);
          if (err.status == 400) {
            this.erroresValidaciones = err.error.errores;
          } else {
            Swal.fire(
              '',
              'Ocurrio un error al intentar actualizar el televisor',
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
