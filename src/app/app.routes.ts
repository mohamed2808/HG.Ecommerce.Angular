import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './features/catalog/productDetails/product-details-component/product-details-component';
import { HomeComponent } from './features/catalog/home-component/home-component';
import { ProductListComponent } from './features/catalog/productList/product-list-component/product-list-component';
import { LoginComponent } from './features/auth/login/login-component/login-component';
import { RegisterComponent } from './features/auth/register/register-component/register-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: { renderMode: 'client' } // ← هذه السطر يحول الصفحة لـ CSR
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
