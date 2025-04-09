import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host = environment.host + 'auth/';
  constructor(private http: HttpClient) {}

  public register(body: any) {
    return this.http.post(this.host + 'register', body);
  }

  public login(body: any) {
    return this.http.post(this.host + 'login', body, { withCredentials: true });
  }

  public getCurrentUser() {
    return this.http.get(this.host + 'me', { withCredentials: true });
  }

  public changePassword(body: any) {
    return this.http.put(this.host + 'change-password', body, {
      withCredentials: true,
    });
  }

  public updateSSHKey(ssh_key_path: string, ssh_key_pass: string) {
    return this.http.put(
      this.host + 'me/ssh-key',
      { ssh_key_pass, ssh_key_path },
      { withCredentials: true }
    );
  }

  public isAuthenticatedUser(): boolean {
    return !!localStorage.getItem('token');
  }
}
