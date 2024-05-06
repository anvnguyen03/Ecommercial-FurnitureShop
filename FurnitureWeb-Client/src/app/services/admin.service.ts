import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL = 'http://localhost:8080/api/v1/admin'

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  addCategory(category: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/category`, category, {
      headers: this.addAuthorizationHeader()
    })
  }

  addProduct(product: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/product`, product, {
      headers: this.addAuthorizationHeader()
    })
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/product`, {
      headers: this.addAuthorizationHeader()
    })
  }

  addCoupon(coupon: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/coupon`, coupon, {
      headers: this.addAuthorizationHeader()
    })
  }

  getAllCoupons(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/coupon`, {
      headers: this.addAuthorizationHeader()
    })
  }

  private addAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
  }
}
