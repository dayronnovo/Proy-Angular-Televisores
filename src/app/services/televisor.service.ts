import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Televisor } from '../models/televisores';

@Injectable({
  providedIn: 'root',
})
export class TelevisorService {
  private urlEndPoint = 'http://localhost:5000/televisor';

  constructor(private http: HttpClient) {}

  public getTelevisoresByClienteIdWithPagination(
    id: number,
    page: number
  ): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/cliente/${id}/${page}`);
  }
  public getTelevisoresByClienteId(id: number): Observable<Televisor[]> {
    return this.http.get<Televisor[]>(`${this.urlEndPoint}/cliente/${id}`);
  }
}
