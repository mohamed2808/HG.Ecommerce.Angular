import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://hgecommerce.runasp.net/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(
    pageIndex = 1,
    pageSize = 8,
    search = ''
  ): Observable<{ items: Product[]; total: number }> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http
      .get<{ data: Product[]; totalCount: number }>(`${this.baseUrl}/paged`, { params })
      .pipe(
        map(res => ({
          items: res.data,
          total: res.totalCount
        }))
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
