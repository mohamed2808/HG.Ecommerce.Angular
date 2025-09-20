import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$();
  }

  logout() {
    this.authService.logout();
  }
}
