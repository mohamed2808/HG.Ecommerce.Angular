import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService]
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // التحقق من المتصفح قبل استخدام localStorage
    if (isPlatformBrowser(this.platformId)) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) this.form.patchValue({ email: rememberedEmail, rememberMe: true });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;

    const { email, password, rememberMe } = this.form.value;

    if (isPlatformBrowser(this.platformId)) {
      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');
    }

    this.auth.login({ email, password }).subscribe({
      next: () => {
        this.loading = false;
        if (isPlatformBrowser(this.platformId)) {
          this.router.navigate(['/']).then(() => window.location.reload());
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Login failed';
      }
    });
  }
}
