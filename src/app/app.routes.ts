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
    canActivate: [AuthGuard], // ruta protegida,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'inventario', component: InventoryComponent },
      { path: 'categorias', component: CategoriesComponent },
      { path: 'descuentos', component: DiscountsComponent },
      { path: 'panel-de-control', component: ControlPanelComponent },
      { path: 'facturas', component: InvoicesComponent },
      { path: 'productos', component: ProductsComponent },
      { path: 'configuracion', component: SettingsComponent },
      { path: 'ventas', component: SellComponent },
      // { path: '', redirectTo: 'users', pathMatch: 'full' } // redirige a users por defecto
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];