import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.tryAutoLogin();
  }
}
