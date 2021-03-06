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

  // public getCronogramaByClienteId(id): Observable<HistorialCronograma[]> {
  //   return this.http.get<HistorialCronograma[]>(`${this.urlEndPoint}/${id}`);
  // }

  public getCronogramaByClienteIdWithPagination(
    id,
    page,
    fecha
  ): Observable<any> {
    // console.log(`CronogramaService: ${fecha['fecha']}`);
    return this.http.put(`${this.urlEndPoint}/${id}/${page}`, fecha);
  }

  public create(historialCronograma): Observable<any> {
    console.log(historialCronograma);
    return this.http.post(`${this.urlEndPoint}`, historialCronograma);
  }

  public delete(id: number): Observable<any> {
    console.log('Ejecutando');
    return this.http.delete(`${this.urlEndPoint}/${id}`);
  }
}
