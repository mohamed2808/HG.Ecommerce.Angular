import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductService } from '../../../../core/services/product-service';
import { ProductStore } from '../../../../core/store/ProductStore';
import { Product } from '../../../../core/models/product';
import { ProductDetailsComponent } from '../../productDetails/product-details-component/product-details-component';

@Component({
  selector: 'app-product-list',
  standalone: true, 
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list-component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ProductDetailsComponent]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null | undefined>; 

  currentPage = 1;
  totalPages = 1;
  pageSize = 8; 

  selectedProduct: Product | null = null; 

  constructor(
    private svc: ProductService,
    private store: ProductStore
  ) {
    this.products$ = this.store.items$;
    this.loading$ = this.store.loading$;
    this.error$ = this.store.error$;
  }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.store.setLoading(true);
    this.currentPage = page;
    this.svc.getProducts(page, this.pageSize).subscribe({
      next: res => {
        this.store.loadProducts(res.items);
        this.totalPages = Math.ceil(res.total / this.pageSize); 
        this.store.setLoading(false);
      },
      error: err => {
        this.store.setError(err?.message || 'Failed to load products');
        this.store.setLoading(false); 
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.load(page);
    }
  }

  viewProduct(product: Product) {
    this.selectedProduct = product; 
  }

  closeModal() {
    this.selectedProduct = null; 
  }

  addToCart(product: Product) {
    console.log('Added to cart:', product);
  }
}
