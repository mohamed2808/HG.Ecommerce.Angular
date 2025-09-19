import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { CommonModule } from '@angular/common';
import { Observable, Subscribable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
  imports: [  CommonModule,
    ReactiveFormsModule,HttpClientModule],
    providers :[AuthService]
})
export class LoginComponent {
  form;
  loading = false;
  error: string|null = null;
products$: Observable<unknown> | Subscribable<unknown> | PromiseLike<unknown> | undefined;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    const { email, password } = this.form.value;
    this.auth.login({ email: email ?? '', password: password ?? '' }).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/']); },
      error: err => { this.loading = false; this.error = err?.error?.message || 'Login failed'; }
    });
  }
}
