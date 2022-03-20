import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
// import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;

  // usuario: UsuarioModel;
  // recordarme = false;
  // private auth: AuthService,
  constructor(private router: Router, private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit() {
    // this.usuario = new UsuarioModel();
  }

  crearFormulario(): void {
    this.forma = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  // guardar(): void{

  //   if(this.forma.invalid){
  //     Object.values(this.forma.controls).forEach(control => {
  //       control.markAsTouched();
  //     });
  //   }

  //   Swal.fire({
  //     allowOutsideClick: false,
  //     icon: 'info',
  //     text: 'Espere por favor...'
  //   });
  //   Swal.showLoading();

  //   this.auth.createUser(this.forma.getRawValue()).subscribe(response => {
  //     console.log(response);
  //     Swal.close();
  //     Swal.fire('Usuario', `${response.mensaje}`, 'success');
  //   },
  //   err=> {
  //     console.log(err);
  //     Swal.fire('Usuario', `${err.error.mensaje}`, 'error');
  //   });
  // }

  // onSubmit( form: NgForm ) {

  //   if ( form.invalid ) { return; }

  //   Swal.fire({
  //     allowOutsideClick: false,
  //     type: 'info',
  //     text: 'Espere por favor...'
  //   });
  //   Swal.showLoading();

  //   this.auth.nuevoUsuario( this.usuario )
  //     .subscribe( resp => {

  //       console.log(resp);
  //       Swal.close();

  //       if ( this.recordarme ) {
  //         localStorage.setItem('email', this.usuario.email);
  //       }

  //       this.router.navigateByUrl('/home');

  //     }, (err) => {
  //       console.log(err.error.error.message);
  //       Swal.fire({
  //         type: 'error',
  //         title: 'Error al autenticar',
  //         text: err.error.error.message
  //       });
  //     });
  // }
}
