import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
// Este guardia verifica si hay un token en localStorage
// Si hay token, redirige al usuario a la página de dashboard
// Si no hay token, permite el acceso a la ruta actual
// Puedes usar este guardia para proteger rutas de login o registro
// Asegúrate de agregar este guardia a las rutas que no requieran autenticación en tu módulo de rutas
// Por ejemplo, en tu archivo de rutas:
// ```typescript
// const routes: Routes = [ 