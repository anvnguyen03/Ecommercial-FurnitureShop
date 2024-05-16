import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseURL = 'http://localhost:8080/api/v1/product'

  constructor(private httpClient: HttpClient) { }

  getNewestProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/getnewest`)
  }

  getAllProductsAvailable(index: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/getall/${index}`)
  }

  getAllProductByName(name: any, index: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/search/${name}/${index}`)
  }

  getAllProductsByCategory(id: any, index: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/category/${id}/${index}`)
  }

  getProductById(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/getone/${id}`)
  }

  getRelatedProductByCategory(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/related/${id}`)
  }
}
