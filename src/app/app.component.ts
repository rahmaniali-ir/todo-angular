import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  links = [
    {
      title: 'Home',
      href: '/',
    },
  ];

  constructor(private authService: AuthService) {}

  get SignedIn() {
    return this.authService.isLoggedIn;
  }

  signOut() {
    this.authService.signOut();
  }
}
