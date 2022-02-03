import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:5000/cliente';

  constructor(private http: HttpClient) {}

  public getClientesPorPagina(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/page/${page}`);
  }

  public getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }
}
