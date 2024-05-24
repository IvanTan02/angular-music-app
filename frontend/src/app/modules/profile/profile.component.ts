import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-node';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AuthService } from '../../shared/auth/auth.service';
import { ProfileService } from './profile.service';
import { ProfileMenuButtonComponent } from './components/profile-menu-button/profile-menu-button.component';
import { SpotifyProfileDetails } from '../../models/auth.model';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, AppButtonComponent, ProfileMenuButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  profilesDetails: SpotifyProfileDetails;

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.profilesDetails = data.userProfile;
    })
  }

  onViewSpotifyProfile() {
    window.location.href = `${this.profilesDetails.external_urls.spotify}`
  }
}
