import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IToken } from '../../../server/modules/auth/interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient
  ) {}

  signUp(email: string, password: string): void {
    this.httpClient.post(`api/auth/signup`, {
      email,
      password
    }).subscribe((token: IToken) => {
      localStorage.setItem('token', token.token);
    });
  }

  signIn(email: string, password: string): void {
    this.httpClient.post(`api/auth/signin`, {
      email,
      password
    }).subscribe((token: IToken) => {
      localStorage.setItem('token', token.token);
    });
  }

  requestFacebookRedirectUri(): Observable<any> {
    return this.httpClient.get('api/auth/facebook/uri');
  }

  requestFacebookAccessToken(code: string): Observable<any> {
    return this.httpClient.post('api/auth/facebook/token', { code });
  }

  facebookSignIn(access_token: string) {
    return this.httpClient.post('api/auth/facebook/signin', { access_token });
  }

  getProtected(): Observable<any> {
    return this.httpClient.get(`api/auth/authorized`);
  }

  getToken(): string {
    try {
    return localStorage.getItem('token');
    } catch (e) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
