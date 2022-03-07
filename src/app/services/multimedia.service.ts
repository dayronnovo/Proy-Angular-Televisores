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
  private httpHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  verFoto(id: number) {
    return `${this.urlEndPoint}/file/${id}`;
  }

  public getMultimediasByTelevisorId(
    televisor_id: number
  ): Observable<Multimedia[]> {
    return this.http.get<Multimedia[]>(
      `${this.urlEndPoint}/televisor/${televisor_id}`
    );
  }
  public getMultimediasByIdsAndTelevisorId(
    ids: number[],
    televisor_id: number
  ): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/reproducir/${televisor_id}`, ids);
  }

  public get_imagenes_by_cliente_id(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/imagenes/${id}`);
  }
  public get_videos_by_cliente_id(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/videos/${id}`);
  }

  public getMultimediasByClienteIdWidthPagination(
    id: number,
    page: number
  ): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/cliente/${id}/${page}`);
  }

  public deleteMultimediasByIds(ids): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/delete`, ids);
  }
}
