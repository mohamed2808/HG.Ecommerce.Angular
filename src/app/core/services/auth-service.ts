import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginDto } from '../models/login-dto';
import { AuthResponse } from '../models/auth-response';
import { RegisterDto } from '../models/register-dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'hg_token';
  private baseUrl = 'https://hgecommerce.runasp.net/api/Auth';
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false); 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (this.isBrowser()) {
      const token = localStorage.getItem(this.tokenKey);
      this._isAuthenticated$.next(!!token);
    }
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    const params = new HttpParams()
      .set('email', dto.email)
      .set('password', dto.password);

    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      {},
      { params }
    ).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, dto)
      .pipe(tap(res => this.handleAuth(res)));
  }

  logout(): void {
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

  private handleAuth(res: AuthResponse): void {
    if (!this.isBrowser()) return;

    const token = res.accessToken || (res as any).token;
    if (token) {
      localStorage.setItem(this.tokenKey, token);
      this._isAuthenticated$.next(true);
    } else {
      this._isAuthenticated$.next(false);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
