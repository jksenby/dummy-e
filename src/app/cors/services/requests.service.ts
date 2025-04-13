import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private host = environment.host + '';
  constructor(private http: HttpClient) {}

  public sendRequest(body: any) {
    var formData = new FormData();
    formData.append('input', body.inputValue);
    if(body.file)
    formData.append('file', body.file);
    return this.http.post(this.host + 'requests', formData, { withCredentials: true });
  }
}
