import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../../../core/models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details-component.html',
  styleUrls: ['./product-details-component.scss']
})
export class ProductDetailsComponent {
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Product>();

  close() {
    this.closeModal.emit();
  }

  onAddToCart() {
    if (this.product) {
      this.addToCart.emit(this.product);
    }
  }
}
