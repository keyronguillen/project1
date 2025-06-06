// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse, UserLogin, UserRegister } from '../modelos/user.model';
import { jwtDecode } from 'jwt-decode';

export interface TokenPayload {
  exp: number;
  // puedes incluir otros campos si tu JWT los tiene (como usuario, rol, etc.)
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data).pipe(
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: UserRegister): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data).pipe(
      catchError((error) => {
        console.error('Error en registro:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (e) {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
// Este servicio maneja la autenticación del usuario
// Incluye métodos para login, registro, logout y verificación de sesión
// Utiliza HttpClient para hacer peticiones al backend
// También maneja el token JWT almacenado en localStorage
// Puedes extender este servicio para incluir más funcionalidades como cambio de contraseña, recuperación de cuenta, etc.
// Asegúrate de importar este servicio en tu módulo principal o en el módulo donde lo necesites
// Por ejemplo, en tu archivo app.module.ts:
// ```typescript
// import { AuthService } from './auth/auth.service';
// @NgModule({
//   providers: [AuthService],
// })
// ```
// Esto asegura que el servicio esté disponible en toda la aplicación
// Puedes inyectar este servicio en tus componentes o guardias para manejar la autenticación de manera centralizada
// También puedes usar este servicio para manejar la lógica de autorización en tus componentes
// Por ejemplo, en un componente de navegación, podrías mostrar u ocultar enlaces según el estado de autenticación del usuario
// ```typescript
// import { AuthService } from './auth/auth.service';
// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
// })
// export class NavbarComponent {
//   constructor(public authService: AuthService) {}