import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get emailFormControl() {
    return this.form.controls.email;
  }

  get passwordFormControl() {
    return this.form.controls.password;
  }

  signIn() {
    const email = this.emailFormControl.value?.trim() || '';
    const password = this.passwordFormControl.value?.trim() || '';

    if (!email.length || !password.length) return;

    this.authService.signIn(email, password);
  }
}
