import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService]
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        fullName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['User'], 
        terms: [false, Validators.requiredTrue]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    const { fullName, phoneNumber, email, password, confirmPassword, role } =
      this.form.value;

    this.auth.register({ fullName, phoneNumber, email, password, confirmPassword, role })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: err => {
          this.loading = false;
          this.error = err?.error?.message || 'Registration failed';
        }
      });
  }
}
