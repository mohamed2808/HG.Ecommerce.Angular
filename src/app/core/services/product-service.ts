import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `https://hgecommerce.runasp.net/products`;

  constructor(private http: HttpClient) {}

  getProducts(page = 1, pageSize = 12, search = ''): Observable<{ items: Product[]; total: number }> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    if (search) params = params.set('search', search);
    return this.http.get<{ items: Product[]; total: number }>(this.base, { params });
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.base}/${id}`);
  }
}
