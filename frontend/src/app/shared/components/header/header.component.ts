import { Component, OnInit } from '@angular/core';
import { AppButtonComponent } from '../../../components/app-button/app-button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { ProfileMenuButtonComponent } from '../../../modules/profile/components/profile-menu-button/profile-menu-button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AppButtonComponent, ProfileMenuButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isAuthenticated: boolean = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
