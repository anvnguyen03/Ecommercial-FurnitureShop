import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseURL = 'http://localhost:8080/api/v1/product'

  constructor(private httpClient: HttpClient) { }

  getAllProduct()  {
    return this.httpClient.get(`${this.baseURL}/getall`)
  }
}
