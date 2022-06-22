import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    const creds = { email, senha };
    return this.http.post(`${API_CONFIG.baseUrl.prod}/login`, creds, {
      responseType: 'text',
      observe: 'response',
    });
  }

  jwt = new JwtHelperService();

  get isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token !== null) {
      return !this.jwt.isTokenExpired(token);
    }

    return false;
  }

  onLogin(token: string) {
    localStorage.setItem('token', token);
  }

  onLogout() {
    localStorage.clear();
  }
}
