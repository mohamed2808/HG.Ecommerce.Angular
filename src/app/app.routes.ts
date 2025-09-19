import path from 'path';
import { App } from './app';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login-component/login-component';
import { Component } from '@angular/core';
import { register } from 'module';
import { RegisterComponent } from './features/auth/register/register-component/register-component';
import { AuthComponent } from './features/auth/auth-component/auth-component';

export const routes: Routes = [
  { path: 'auth', children:[ {
    path: 'login' , component: LoginComponent
  },
   {
    path: 'register', component: RegisterComponent
   }
]
},
  {path:'',component: App},
  { path: '**', redirectTo: '' }
];

