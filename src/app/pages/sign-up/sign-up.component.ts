import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get nameFormControl() {
    return this.form.controls.name;
  }

  get emailFormControl() {
    return this.form.controls.email;
  }

  get passwordFormControl() {
    return this.form.controls.password;
  }

  get confirmPasswordFormControl() {
    return this.form.controls.confirmPassword;
  }

  signUp() {
    if (
      this.passwordFormControl.value !== this.confirmPasswordFormControl.value
    )
      return;

    const name = this.nameFormControl.value?.trim() || '';
    const email = this.emailFormControl.value?.trim() || '';

    const password = this.passwordFormControl.value?.trim() || '';

    if (!email.length || !password.length) return;

    this.authService.signUp(name, email, password);
  }
}
