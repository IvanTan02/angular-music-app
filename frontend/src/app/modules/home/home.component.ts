import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AppButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onLoginWithSpotify() {
    window.location.href = environment.spotify.authUrl;
  }
}
