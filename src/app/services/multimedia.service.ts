import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  private urlEndPoint = 'http://localhost:5000/multimedia';

  constructor(private http: HttpClient) {}

  public getMultimediaByClienteId(id: number, page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/cliente/${id}/${page}`);
  }
}
