import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authToken: string = '';

  constructor(private authService: AuthService) { }
  ngOnInit() {
    console.log('AUTH', this.authService.accessToken)
  }
}
