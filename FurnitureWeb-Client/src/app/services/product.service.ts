import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseURL = 'http://localhost:8080/api/v1/product'

  constructor(private httpClient: HttpClient) { }

  getAllProduct(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/getall`)
  }

  getAllProductByName(name: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/search/${name}`)
  }

}
