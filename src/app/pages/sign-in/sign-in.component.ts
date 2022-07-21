import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signIn() {
    const email = this.email.trim();
    const password = this.password.trim();

    if (!email.length || !password.length) return;

    this.authService.signIn(email, password);
  }
}
