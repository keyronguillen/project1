import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  role: number | null = null;
  isSmallScreen = false;
  isSidenavOpen = true;
  private breakpointSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });

    this.breakpointSub = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.isSidenavOpen = !this.isSmallScreen; // cerrado en pantallas chicas, abierto en grandes
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }

  isAdmin(): boolean {
    return this.role === 1;
  }

  isEditor(): boolean {
    return this.role === 2;
  }

  isUser(): boolean {
    return this.role === 3;
  }

  logout() {
    this.authService.logout();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  // Para cerrar sidenav en modo overlay tras click en item (solo en pantallas chicas)
  maybeCloseSidenav() {
    if (this.isSmallScreen) {
      this.isSidenavOpen = false;
    }
  }
}
