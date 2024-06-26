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

  getAllPlacedOrders(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/placed-order`, {
      headers: this.addAuthorizationHeader()
    })
  }

  changeOrderStatus(orderId: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/order/${orderId}`, null, {
      headers: this.addAuthorizationHeader()
    })
  }

  getOrderAnalytics(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/order/analytics`)
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/user`)
  }

  changeUserStatus(userId: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/user/change-status/${userId}`)
  }

  private addAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
  }
}
