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

  register(singUpRequest: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/signup`, singUpRequest)
  }

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

  getUserEmail() {
    this.token = this.getToken()
    if (!this.token) {
      return null
    }

    const payload = JSON.parse(atob(this.token.split('.')[1]))
    return payload.sub
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
  }

  setUser(user: any) {
    localStorage.setItem('user', user)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUser() {
    return localStorage.getItem('user')
  }

  getUserFullName() {
    const user = JSON.parse(localStorage.getItem('user')!)
    return user.fullname
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
