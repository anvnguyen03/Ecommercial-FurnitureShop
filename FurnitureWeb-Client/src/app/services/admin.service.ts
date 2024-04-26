import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL = "http://localhost:8080/api/v1/admin"

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  addCategory(category: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/category`, category, {
      headers: this.addAuthorizationHeader()
    })
  }

  private addAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken())
  }
}
