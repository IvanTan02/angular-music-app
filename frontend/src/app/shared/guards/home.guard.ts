import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.isAccessTokenValid()) {
    this.authService.isAuthenticated = true;
    } else {
    this.authService.isAuthenticated = false;
    }
    return true;
  }

  private isAccessTokenValid(): boolean {
    return false;
  }
}
