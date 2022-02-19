import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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
