import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../models/cliente';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:5000/cliente';

  private httpHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public getClientesPorPagina(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/page/${page}`);
  }

  public getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  public create(nombre_cliente): Observable<any> {
    return this.http
      .post(
        `${this.urlEndPoint}`,
        { nombre: nombre_cliente },
        { headers: this.httpHeader }
      )
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  public update(cliente): Observable<any> {
    return this.http
      .put(`${this.urlEndPoint}`, cliente, { headers: this.httpHeader })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  public cargarArchivos(
    archivo: File,
    cliente_id: string
  ): Observable<HttpEvent<{}>> {
    let formData = new FormData();

    formData.append('archivo', archivo);
    formData.append('cliente_id', cliente_id);

    // let televisor = new Televisor();
    // televisor.id = 2;
    // televisor.ubicacion = 'Sala';

    // const blob = new Blob([JSON.stringify(idsTelevisores, null, 2)], {
    //   type: 'application/json',
    // });

    // formData.append('televisor', blob);

    // return this.http.post(`${this.urlEndPoint}/upload`, formData);
    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/multimedias`,
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req);
  }
}
