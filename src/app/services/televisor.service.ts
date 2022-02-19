import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Televisor } from '../models/televisores';
import { Multimedia } from '../models/multimedia';

@Injectable({
  providedIn: 'root',
})
export class TelevisorService {
  private urlEndPoint = 'http://localhost:5000/televisor';

  constructor(private http: HttpClient) {}

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
  public getTelevisoresByClienteId(id: string): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/cliente/${id}`);
  }

  public update_multimedias(
    id_televisor: number,
    multimedias: Multimedia[]
  ): Observable<any> {
    return this.http.put(
      `${this.urlEndPoint}/update/multimedias/${id_televisor}`,
      multimedias
    );
  }
}
