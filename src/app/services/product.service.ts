import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/product';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  /* get all */
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseURL}/products`);
  }
  /* get ONe */
  getOne(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseURL}/products/${id}`);
  }
  /* add */
  add(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.baseURL}/products`, product);
  }
  /* edit */
  edit(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseURL}/products/${id}`, product);
  }
  /* delete */
  delete(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.baseURL}/products/${id}`);
  }
}
