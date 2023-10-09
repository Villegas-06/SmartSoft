import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  constructor() {}

  login(email: string, password: string): boolean {
    // Simulate the auth, checking if the email and password match
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === email && password === password) {
      // Set localstorage for login
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedInSubject.next(true);
      return true; // login success
    } else {
      return false; // login fail
    }
  }

  logout(): void {
    // Logout delete the state
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }
}
