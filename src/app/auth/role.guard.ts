import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles: number[] = route.data['expectedRoles'];
    const userRole: number = this.authService.getUserRole();
    // console.log('RoleGuard: expectedRoles =', expectedRoles, ', userRole =', userRole);

    if (expectedRoles.includes(userRole)) {
      return true;
    }
    return this.router.parseUrl('/unauthorized');
  }
}