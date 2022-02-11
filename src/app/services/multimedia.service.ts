import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  private urlEndPoint = 'http://localhost:5000/multimedia';

  constructor(private http: HttpClient) {}

  public cargarArchivos(
    archivo: File,
    idsTelevisores: number[]
  ): Observable<HttpEvent<{}>> {
    let formData = new FormData();

    formData.append('archivo', archivo);

    // let televisor = new Televisor();
    // televisor.id = 2;
    // televisor.ubicacion = 'Sala';

    const blob = new Blob([JSON.stringify(idsTelevisores, null, 2)], {
      type: 'application/json',
    });

    formData.append('televisor', blob);

    // return this.http.post(`${this.urlEndPoint}/upload`, formData);
    const req = new HttpRequest('POST', `${this.urlEndPoint}`, formData, {
      reportProgress: true,
    });
    return this.http.request(req);
  }

  verFoto(id: number) {
    return `${this.urlEndPoint}/file/${id}`;
  }

  public getMultimediasByClienteId(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/cliente/${id}`);
  }
}
