import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = "http://localhost:8080/api/v1/auth"

  constructor(private httpClient: HttpClient) { }

  private token?: string | null

  postLogin(signInRequest: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/signin`, signInRequest)
  }

  validateToken(token: any): Observable<boolean> {
    return this.httpClient.post<any>(`${this.baseURL}/validate-token`, token)
  }

  getUserRole() {
    this.token = this.getToken()
    if (!this.token) {
      return null
    }

    const payload = JSON.parse(atob(this.token.split('.')[1]))
    return payload.role
  }

  getUsername() {
    this.token = this.getToken()
    if (!this.token) {
      return null
    }

    const payload = JSON.parse(atob(this.token.split('.')[1]))
    return payload.sub.split('@')[0]
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
  }
}
