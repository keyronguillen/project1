import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../modelos/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  data: UserRegister = {
    nombre: '',
    apellidos: '',
    telefono: '',
    dni: '',
    correo: '',
    usuario: '',
    contrasena: '',
    genero: 'Masculino',
  };

  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.register(this.data).subscribe({
      next: () => {
        this.successMsg = 'Registro exitoso, ya puedes iniciar sesión';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMsg = 'Error en el registro, verifica los datos';
        console.error('Error registro', err);
      },
    });
  }
}
