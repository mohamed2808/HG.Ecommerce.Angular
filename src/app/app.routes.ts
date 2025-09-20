import path from 'path';
import { App } from './app';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login-component/login-component';
import { Component } from '@angular/core';
import { register } from 'module';
import { RegisterComponent } from './features/auth/register/register-component/register-component';
import { AuthComponent } from './features/auth/auth-component/auth-component';
import { HomeComponent } from './features/catalog/home-component/home-component';
import { ProductDetailsComponent } from './features/catalog/productDetails/product-details-component/product-details-component';
import { ProductListComponent } from './features/catalog/productList/product-list-component/product-list-component';

export const routes: Routes = [
  { path: 'auth', children:[ {
    path: 'login' , component: LoginComponent
  },
   {
    path: 'register', component: RegisterComponent
   }
]
},
  {path:'',component: HomeComponent},
  {
  path: 'products/:id',
  component: ProductDetailsComponent
},
  {path:'products',component:ProductListComponent},
  { path: '**', redirectTo: '' }
];

