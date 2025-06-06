import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../modelos/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginData: UserLogin = {
    usuario: '',
    contrasena: '',
  };

  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMsg = '';
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        this.errorMsg = 'Usuario o contraseña incorrectos';
        console.error('Error login', err);
      },
    });
  }
}
