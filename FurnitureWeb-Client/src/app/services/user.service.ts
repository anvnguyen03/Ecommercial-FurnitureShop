import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private baseURL = 'http://localhost:8080/api/v1/user'

  addToCart(productId: any, quantity: any): Observable<any> {

    const userObject = JSON.parse(this.authService.getUser()!)

    const cartDto: any = {
      productId: productId,
      userId: userObject.userId,
      quantity: quantity
    }
    
    return this.httpClient.post(`${this.baseURL}/cart`, cartDto, {
      headers: this.addAuthorizationHeader()
    })

  }

  getCartByUserId(): Observable<any> {

    const userObject = JSON.parse(this.authService.getUser()!)
    const userId = userObject.userId
    
    return this.httpClient.get(`${this.baseURL}/cart/${userId}`, {
      headers: this.addAuthorizationHeader()
    })

  }

  private addAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
  }
}