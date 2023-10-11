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

  constructor() {
    // Check if the user is authenticated when the service is loaded.
    this.isLoggedInSubject.next(this.isAuthenticated());
  }

  login(email: string, password: string): boolean {
    // Simulate authentication, checking if the email and password match
    if (email && password) {
      // Set localStorage for login
      localStorage.setItem('token', 'true');
      this.isLoggedInSubject.next(true); // Update the navbar state
      return true; // Login successful
    } else {
      return false; // Login failed
    }
  }

  logout(): void {
    // Remove the login state
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false); // Update the navbar state
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token === 'true'; // Convert the token value to a boolean
  }
}
