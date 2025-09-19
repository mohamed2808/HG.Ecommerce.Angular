import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register-component.html',
  imports:[ReactiveFormsModule,CommonModule]
})
export class RegisterComponent {
  form;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form= this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const {email,fullName,password} = this.form.value;
    this.auth.register({ email: email ?? '',fullName: fullName ?? '', password: password ?? '' }).subscribe({
      next: () => { this.router.navigate(['/login']); },
      error: err => { this.error = err.error?.message || 'Registration failed'; this.loading = false; }
    });
  }
}
