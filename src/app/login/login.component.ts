import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const { email, password } = this;
    const isAuthenticated = this.authService.login(email, password);

    if (isAuthenticated) {
      this.router.navigate(['/covid19']);
    } else {
      console.log('Inicio de sesión fallido. Verifique sus credenciales.');
    }
  }
}
