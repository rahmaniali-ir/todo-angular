import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../types/auth';
import { User } from '../types/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  private _token = '';

  constructor(private apiService: ApiService, private router: Router) {
    this.loadCredentialsFromLocalhost();
  }

  get token() {
    return this._token;
  }

  get user() {
    return this.user$.value;
  }

  get isLoggedIn() {
    return this.user !== null;
  }

  private saveCredentialsToLocalhost(auth: AuthResponse) {
    localStorage.setItem('token', auth.token);
    this._token = auth.token;

    localStorage.setItem('user', JSON.stringify(auth.user));
  }

  private loadCredentialsFromLocalhost() {
    const token = localStorage.getItem('token');

    if (token) {
      this._token = token;
    }

    const user = localStorage.getItem('user');

    if (user) this.user$.next(JSON.parse(user));
  }

  signIn(email: string, password: string) {
    this.apiService
      .post<AuthResponse>('sign-in', { email, password })
      .subscribe((res) => {
        if (res.body) this.saveCredentialsToLocalhost(res.body);
      });
  }

  signUp(name: string, email: string, password: string) {
    this.apiService
      .post<AuthResponse>('sign-up', { name, email, password })
      .subscribe((auth) => {
        console.log(auth);
      });
  }

  signOut() {
    this.apiService.delete<boolean>('sign-out').subscribe((res) => {
      if (res.body) {
        localStorage.clear();
        this.user$.next(null);
        this._token = '';

        this.router.navigate(['/sign-in']);
      }
    });
  }
}
