import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialCronograma } from '../models/historial_cronograma';

@Injectable({
  providedIn: 'root',
})
export class CronogramaService {
  private urlEndPoint = 'http://localhost:5000/historial';

  constructor(private http: HttpClient) {}

  public getCronogramaByClienteId(id): Observable<HistorialCronograma[]> {
    return this.http.get<HistorialCronograma[]>(`${this.urlEndPoint}/${id}`);
  }

  public getCronogramaByClienteIdWithPagination(id, page): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/${id}/${page}`);
  }

  public create(historialCronograma): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, historialCronograma);
  }
}