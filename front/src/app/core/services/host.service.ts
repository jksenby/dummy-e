import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HostService {
  constructor(private http: HttpClient) {}

  public getHosts(): Observable<any> {
    return this.http.get('http://localhost:3000/api/hosts');
  }

  public postHost(host: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/newhost', host);
  }

  public deleteHost(id: number) {
    return this.http.delete('http://localhost:3000/api/hosts/' + id);
  }

  public putHost(body: any) {
    return this.http.put(
      'http://localhost:3000/api/updatehost/' + body.id,
      body
    );
  }
}
