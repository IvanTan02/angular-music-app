import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SpotifyAuthCredentials } from '../../models/auth.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const queryParams = route.queryParams

    if (this.hasAllCredentials(route)) {
      const creds: SpotifyAuthCredentials = {
        accessToken: queryParams['accessToken'],
        refreshToken: queryParams['refreshToken'],
        tokenExpiration: queryParams['expiresIn'],
      }

      this.authService.initCredentials(creds);
      this.router.navigate(['/']);
      return false;
    }

    // TODO - Display failure toast message
    return false;
  }

  private hasAllCredentials(route: ActivatedRouteSnapshot) {
    const queryParams = route.queryParams;
    return (queryParams['accessToken'] && queryParams['refreshToken'] && queryParams['expiresIn']);
  }
}
