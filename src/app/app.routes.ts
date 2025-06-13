import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';
import { UserComponent } from './component/users/users.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { DiscountsComponent } from './component/discounts/discounts.component';
import { ControlPanelComponent } from './component/control-panel/control-panel.component';
import { InvoicesComponent } from './component/invoices/invoices.component';
import { ProductsComponent } from './component/products/products.component';
import { SettingsComponent } from './component/settings/settings.component';
import { SellComponent } from './component/sell/sell.component';
import { RoleGuard } from './auth/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'users',
      loadComponent: () => import('./component/users/users.component').then(m => m.UserComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1] }
    },
    {
      path: 'inventario',
      loadComponent: () => import('./component/inventory/inventory.component').then(m => m.InventoryComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1] }
    },
    {
      path: 'categorias',
      loadComponent: () => import('./component/categories/categories.component').then(m => m.CategoriesComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1] }
    },
    {
      path: 'descuentos',
      loadComponent: () => import('./component/discounts/discounts.component').then(m => m.DiscountsComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1] }
    },
    {
      path: 'ventas',
      loadComponent: () => import('./component/sell/sell.component').then(m => m.SellComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1] }
    },
    {
      path: 'facturas',
      loadComponent: () => import('./component/invoices/invoices.component').then(m => m.InvoicesComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1] }
    },
    {
      path: 'productos',
      loadComponent: () => import('./component/products/products.component').then(m => m.ProductsComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1, 3] }
    },
    {
      path: 'configuracion',
      loadComponent: () => import('./component/settings/settings.component').then(m => m.SettingsComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1, 2] }
    },
    {
      path: 'panel-de-control',
      loadComponent: () => import('./component/control-panel/control-panel.component').then(m => m.ControlPanelComponent),
      canActivate: [RoleGuard],
      data: { expectedRoles: [1, 2] }
    }
  ]
},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];