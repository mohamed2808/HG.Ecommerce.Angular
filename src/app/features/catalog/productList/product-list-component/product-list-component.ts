import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service';
import { ProductStore } from '../../../../core/store/ProductStore';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list-component.scss'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class ProductListComponent implements OnInit {
  products$;
  loading$;
  error$;

  constructor(private svc: ProductService, private store: ProductStore) {
    this.products$ = this.store.items$;
    this.loading$ = this.store.loading$;
    this.error$ = this.store.error$;
  }

  ngOnInit() {
    this.load();
  }

  load(page = 1) {
    this.store.setLoading(true);
    this.svc.getProducts(page, 12).subscribe({
      next: res => this.store.loadProducts(res.items),
      error: err => this.store.setError(err?.message || 'Failed to load products')
    });
  }
}
