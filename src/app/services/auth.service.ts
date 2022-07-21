import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  constructor() {}

  get user() {
    return this.user$.value;
  }

  get isLoggedIn() {
    return this.user !== null;
  }
}
