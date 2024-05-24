import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-node';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AuthService } from '../../shared/auth/auth.service';
import { ProfileService } from './profile.service';
import { ProfileMenuButtonComponent } from './components/profile-menu-button/profile-menu-button.component';
import { SpotifyProfileDetails } from '../../models/auth.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AppButtonComponent, ProfileMenuButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  profilesDetails: SpotifyProfileDetails;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profilesDetails = this.profileService.profileDetails;
    console.log(this.profilesDetails);
  }
}
