import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private apiService: ApiService) {}

  get user() {
    return this.user$.value;
  }

  get isLoggedIn() {
    return this.user !== null;
  }

  signIn(email: string, password: string) {
    this.apiService
      .post<User | null>('sign-in', { email, password })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
