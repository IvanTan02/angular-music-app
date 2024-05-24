import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AppButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isAuthenticated: boolean = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  onLoginWithSpotify() {
    window.location.href = environment.spotify.authUrl;
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
