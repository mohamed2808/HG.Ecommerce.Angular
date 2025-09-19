import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginDto } from '../models/login-dto';
import { AuthResponse } from '../models/auth-response';
import { RegisterDto } from '../models/register-dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'hg_token';
  private _isAuthenticated$!: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const token = this.isBrowser() ? localStorage.getItem(this.tokenKey) : null;
    this._isAuthenticated$ = new BehaviorSubject<boolean>(!!token);
  }

  login(dto: LoginDto) {
    return this.http.post<AuthResponse>(
      `https://hgecommerce.runasp.net/auth/login`,
      dto
    ).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(
      `https://hgecommerce.runasp.net/auth/register`,
      dto
    ).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
    this._isAuthenticated$.next(false);
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.tokenKey) : null;
  }

  isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  private handleAuth(res: AuthResponse) {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, res.token);
    }
    this._isAuthenticated$.next(true);
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
