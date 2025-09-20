import { Component, signal } from '@angular/core';
import { AuthRoutingModule } from "./features/auth/AuthRoutingModule";
import { FooterComponent } from "./shared/components/footer-component/footer-component";
import { NavbarComponent } from "./shared/components/navbar-component/navbar-component";
import { ProductDetailsComponent } from "./features/catalog/productDetails/product-details-component/product-details-component";

@Component({
  selector: 'app-root',
  imports: [AuthRoutingModule, FooterComponent, NavbarComponent, ProductDetailsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('HG.Ecommerce.Angular');
}
