import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlEndPoint: string = 'http://localhost:5000/login';
  credentials = btoa(
    'angular_app_televisores' + ':' + '264dd4ae1ea6476cb21eb52b2ae4f54d'
  );

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${this.credentials}`,
  });

  usuario: Usuario;
  access_token: any;

  constructor(private http: HttpClient) {}

  login(user_email, password): Observable<any> {
    // console.log({ user_email: user_email, password: password });
    // console.log(this.credentials);
    let params = new URLSearchParams();
    params.set('user_email', user_email);
    params.set('password', password);

    return this.http.post(`${this.urlEndPoint}`, params.toString(), {
      headers: this.httpHeaders,
    });
  }

  guardarUsuario(access_token: string): void {
    let sub = this.obtenerPayloadToken(access_token)['sub'];
    this.usuario = new Usuario();
    this.usuario.user_name = sub.user_name;
    // this.usuario.password = sub.password;
    this.usuario.email = sub.email;
    this.usuario.active = sub.active;
    this.usuario.roles = sub.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
    console.log(this.usuario);
  }

  guardarAccessToken(token: string): void {
    this.access_token = token;
    sessionStorage.setItem('access_token', this.access_token);
    console.log(this.access_token);
  }

  obtenerPayloadToken(token: string): any {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  public get getUsuario() {
    if (this.usuario != null) {
      return this.usuario;
    } else if (
      this.usuario == null &&
      sessionStorage.getItem('usuario') != null
    ) {
      this.usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this.usuario;
    } else {
      return new Usuario();
    }
  }

  public get getAccessToken() {
    if (this.access_token != null) {
      return this.access_token;
    } else if (
      this.access_token == null &&
      sessionStorage.getItem('access_token') != null
    ) {
      this.access_token = sessionStorage.getItem('access_token');
      return this.access_token;
    } else {
      return null;
    }
  }

  isAutenticated(): boolean {
    if (this.getAccessToken != null && this.getUsuario != null) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuario = new Usuario();
    this.access_token = null;

    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('access_token');
    // sessionStorage.clear();
  }

  // hasRole(role: string): boolean {
  //   if (this.usuario.roles.some((aut) => aut.authority == role)) {
  //     return true;
  //   }
  //   return false;
  // }
}
