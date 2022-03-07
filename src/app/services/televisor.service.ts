import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Televisor } from '../models/televisores';
import { Multimedia } from '../models/multimedia';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TelevisorService {
  private urlEndPoint = 'http://localhost:5000/televisor';

  private httpHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public getTelevisorById(id: number): Observable<Televisor> {
    return this.http.get<Televisor>(`${this.urlEndPoint}/${id}`);
  }

  // Lo uso CronogramaComponent
  public getTelevisorAndClienteByTelevisorId(
    id: number
  ): Observable<Televisor> {
    return this.http.get<Televisor>(`${this.urlEndPoint}/${id}`);
  }

  public getTelevisoresByClienteIdWithPagination(
    id: number,
    page: number
  ): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/cliente/${id}/${page}`);
  }
  public getTelevisoresByClienteId(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/cliente/${id}`).pipe(
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  public update_multimedias(
    televisores: Televisor[],
    multimedias: Multimedia[]
  ): Observable<any> {
    let data = { televisores: televisores, multimedias: multimedias };
    return this.http.put(`${this.urlEndPoint}/update/multimedias`, data);
  }

  public create(ubicacion_televisor, cliente_id): Observable<any> {
    return this.http
      .post(
        `${this.urlEndPoint}/${cliente_id}`,
        { ubicacion: ubicacion_televisor },
        { headers: this.httpHeader }
      )
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  public update(televisor): Observable<any> {
    return this.http
      .put(`${this.urlEndPoint}`, televisor, { headers: this.httpHeader })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  public getTelevisoresByhistorialIdWithPagination(
    id: number,
    page: number
  ): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/historial/${id}/${page}`);
  }
}
