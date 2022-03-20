import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario;

  recordarme = false;

  // private auth: AuthService,
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // usuario: UsuarioModel = new UsuarioModel();
  }

  ngOnInit() {
    this.crearFormulario();
    if (this.auth.isAutenticated()) {
      Swal.fire(
        'LogIn',
        `Hola ${this.auth.getUsuario.user_name} ya está autenticado.`,
        'info'
      );
      this.router.navigate(['/clientes']);
    }

    // if (localStorage.getItem('email')) {
    //   this.usuario.email = localStorage.getItem('email');
    //   this.recordarme = true;
    // }
  }

  crearFormulario(): void {
    this.forma = this.fb.group({
      user_email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  guardar(): void {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    this.auth
      .login(
        this.forma.getRawValue()['user_email'],
        this.forma.getRawValue()['password']
      )
      .subscribe(
        (response) => {
          Swal.close();

          this.auth.guardarUsuario(response.access_token);
          this.auth.guardarAccessToken(response.access_token);
          // this.router.navigate(['/clientes']);
          Swal.fire('LogIn', `Ha iniciado sesion con éxito.`, 'success');
        },
        (err) => {
          if (err.status == 401) {
            Swal.fire(
              'Error al autenticar',
              `Usuario, email o password incorrecto.`,
              'error'
            );
          }
        }
      );
  }

  validarCampo(campo: string): boolean {
    return this.forma.get(campo).touched && this.forma.get(campo).invalid;
  }
  mensajeRequerido(campo: string): boolean {
    return this.forma.get(campo).errors.required;
  }
  mensajeMinlength(campo: string): boolean {
    return this.forma.get(campo).errors.minlength;
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Swal.fire({
    //   allowOutsideClick: false,
    //   type: 'info',
    //   text: 'Espere por favor...'
    // });
    Swal.showLoading();

    // this.auth.login(this.usuario).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //     Swal.close();

    //     if (this.recordarme) {
    //       localStorage.setItem('email', this.usuario.email);
    //     }

    //     this.router.navigateByUrl('/home');
    //   },
    //   (err) => {
    //     console.log(err.error.error.message);
    //     // Swal.fire({
    //     //   type: 'error',
    //     //   title: 'Error al autenticar',
    //     //   text: err.error.error.message
    //     // });
    //   }
    // );
  }
}
