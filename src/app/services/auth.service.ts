import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }

  constructor() {}

  getUserRole(): number {
    const role = localStorage.getItem('userRole');
    return role !== null ? parseInt(role, 10) : -1; // siempre devuelve number
  }

  isAdmin(): boolean {
    return this.getUserRole() === 1;
  }

  isEditor(): boolean {
    return this.getUserRole() === 2;
  }

  isUser(): boolean {
    return this.getUserRole() === 3;
  }
}
