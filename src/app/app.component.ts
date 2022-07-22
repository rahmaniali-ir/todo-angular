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
      icon: 'home',
      protected: true,
    },
    {
      title: 'Sign in',
      href: '/sign-in',
      icon: 'login',
      protected: false,
    },
    {
      title: 'Sign up',
      href: '/sign-up',
      icon: 'how_to_reg',
      protected: false,
    },
  ];

  constructor(private authService: AuthService) {}

  get SignedIn() {
    return this.authService.isLoggedIn;
  }

  get filteredLinks() {
    return this.links.filter((link) => link.protected === this.SignedIn);
  }

  signOut() {
    this.authService.signOut();
  }
}
