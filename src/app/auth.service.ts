import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn === 'true';
  }

  login(email: string, password: string): boolean {
    // Simulate the auth, checking if the email and password match
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === email && password === password) {
      // Set localstorage for login
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedIn = true;
      return true; // login success
    } else {
      return false; // login fail
    }
  }

  logout(): void {
    // Logout delete the state
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }
}
