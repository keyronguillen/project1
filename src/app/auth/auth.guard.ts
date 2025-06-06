import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Si el token es inválido o expirado, redirige al login
    this.authService.logout();
    return false;
  }
}
// }
// ```
// // Este guardia verifica si el usuario está autenticado usando AuthService
// // Si el usuario está autenticado, permite el acceso a la ruta
// // Si no está autenticado, redirige al usuario a la página de login
// // Asegúrate de agregar este guardia a las rutas que requieran autenticación en tu módulo de rutas
// // Por ejemplo, en tu archivo de rutas:
// // ```typescript
// // const routes: Routes = [