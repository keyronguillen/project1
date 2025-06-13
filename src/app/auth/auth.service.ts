// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse, UserLogin, UserRegister } from '../modelos/user.model';
import {jwtDecode} from 'jwt-decode'; // asegúrate de importar así
import { tap } from 'rxjs/operators';

export interface TokenPayload {
  exp: number;
  id_rol?: number; // opcional, según lo que tengas en el JWT
  // otros campos que tenga tu token
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';

  // Inicializa el roleSubject leyendo el rol guardado o el token
  private roleSubject = new BehaviorSubject<number | null>(this.getUserRole());
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem('token', token);
      // Actualizar rol también
      const decoded: any = jwtDecode(token);
      if (decoded.id_rol) {
        localStorage.setItem('userRole', decoded.id_rol.toString());
        this.roleSubject.next(decoded.id_rol);
      } else {
        localStorage.removeItem('userRole');
        this.roleSubject.next(null);
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      this.roleSubject.next(null);
    }
  }

  login(data: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        const decoded: any = jwtDecode(res.token);
        if (decoded.id_rol) {
          localStorage.setItem('userRole', decoded.id_rol.toString());
          this.roleSubject.next(decoded.id_rol);
        } else {
          localStorage.removeItem('userRole');
          this.roleSubject.next(null);
        }
      }),
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
    localStorage.removeItem('userRole');
    this.roleSubject.next(null);
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

  getUserRole(): number {
    // Leer primero localStorage 'userRole'
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      const roleNum = Number(storedRole);
      if (!isNaN(roleNum)) return roleNum;
    }

    // Si no está guardado, intentar decodificar el token
    const token = localStorage.getItem('token');
    if (!token) return -1;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id_rol || -1;
    } catch {
      return -1;
    }
  }
}
