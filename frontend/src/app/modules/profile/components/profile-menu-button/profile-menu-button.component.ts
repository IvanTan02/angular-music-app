import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/auth/auth.service';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-profile-menu-button',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './profile-menu-button.component.html',
  styleUrl: './profile-menu-button.component.scss'
})
export class ProfileMenuButtonComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {

  }

  onViewProfile() {
    this.router.navigate(['/profile']);
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
