import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SpotifyAuthCredentials } from '../../models/auth.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'auth-redirect',
  standalone: true,
  imports: [],
  template: '<p>Redirecting...</p>',
})
export class AuthRedirectComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams

    if (this.hasAllCredentials(this.route.snapshot)) {
      const creds: SpotifyAuthCredentials = {
        accessToken: queryParams['accessToken'],
        refreshToken: queryParams['refreshToken'],
        tokenExpiration: queryParams['expiresIn'],
      }

      this.authService.isAuthenticated = true;
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
