import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar color="primary">Mi Dashboard</mat-toolbar>
    <mat-sidenav-container style="height: 100vh;">
      <mat-sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/user" routerLinkActive="active-link">Usuarios</a>
          <a mat-list-item routerLink="/" routerLinkActive="active-link" (click)="logout()">Logout</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .active-link {
      font-weight: bold;
      color: #1976d2;
    }
  `]
})
export class DashboardComponent {
  logout() {
    localStorage.removeItem('token');
    // Aquí podrías redirigir al login, por ejemplo 
  }
}
// Este componente crea un dashboard con una barra lateral
// que contiene enlaces a diferentes secciones (usuarios, logout).
// El enlace de logout elimina el token del localStorage.
// Puedes agregar más enlaces según las secciones de tu aplicación.
// Asegúrate de que las rutas estén definidas en tu módulo de rutas.
// Este componente utiliza Angular Material para el diseño de la barra lateral y la barra de herramientas.
// Asegúrate de tener Angular Material instalado y configurado en tu proyecto.
// Puedes personalizar los estilos y la estructura según tus necesidades.
// Este componente es independiente y puede ser utilizado en cualquier parte de tu aplicación Angular.
// Asegúrate de importar los módulos necesarios de Angular Material en tu módulo principal o en el módulo donde se declare este componente.
// Puedes agregar más funcionalidades como autenticación, autorización, etc., según los requisitos de tu aplicación.
// Este componente es un ejemplo básico de cómo estructurar un dashboard en Angular con navegación lateral. 