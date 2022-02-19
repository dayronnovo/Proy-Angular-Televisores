import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Multimedia } from '../models/multimedia';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  private urlEndPoint = 'http://localhost:5000/multimedia';

  constructor(private http: HttpClient) {}

  verFoto(id: number) {
    return `${this.urlEndPoint}/file/${id}`;
  }

  // public getMultimediasByTelevisorId(id: number): Observable<any> {
  //   return this.http.get(`${this.urlEndPoint}/televisor/${id}`);
  // }
  // public getMultimediasByIdsAndTelevisorId(
  //   ids: number[],
  //   televisor_id: number
  // ): Observable<any> {
  //   return this.http.put(`${this.urlEndPoint}/reproducir/${televisor_id}`, ids);
  // }

  public get_imagenes_by_cliente_id(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/imagenes/${id}`);
  }
  public get_videos_by_cliente_id(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/videos/${id}`);
  }

  // public getMultimediasByClienteId(id: number): Observable<any> {
  //   return this.http.get(`${this.urlEndPoint}/cliente/${id}`);
  // }
}
