import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signUp() {
    if (this.password !== this.confirmPassword) return;

    const name = this.name.trim();
    const email = this.email.trim();

    const password = this.password.trim();

    if (!email.length || !password.length) return;

    this.authService.signUp(name, email, password);
  }
}
