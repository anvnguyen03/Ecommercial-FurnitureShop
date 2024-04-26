import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = 'http://localhost:8080/api/v1/category'

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/getall`)
  }
}
