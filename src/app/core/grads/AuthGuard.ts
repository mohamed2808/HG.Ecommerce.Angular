import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    return this.auth.isAuthenticated$().pipe(
      first(),
      tap(isAuth => { if (!isAuth) this.router.navigate(['/login']); })
    );
  }
}
