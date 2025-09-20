import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar-component/navbar-component";
import { FooterComponent } from "../../../shared/components/footer-component/footer-component";
import { CommonModule } from '@angular/common';
import { ProductListComponent } from "../productList/product-list-component/product-list-component";

@Component({
  selector: 'app-home',
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss'],
  imports: [RouterLink, CommonModule, ProductListComponent]
})
export class HomeComponent {
  featuredProducts = [
    { id: 1, name: 'Fresh Apples', price: 3.5, image: '' },
    { id: 2, name: 'Orange Juice', price: 2.9, image: '' },
    { id: 3, name: 'Smartphone', price: 299.99, image: '' },
    { id: 4, name: 'Headphones', price: 49.99, image: '' },
  ];
}
