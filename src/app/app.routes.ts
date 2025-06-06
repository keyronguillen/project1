import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';
// import { UsersComponent } from './components/users/users.component';

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
    canActivate: [AuthGuard], // ruta protegida
    // children: [
    //   { path: 'user', component: UsersComponent},
    //   // Puedes agregar más rutas hijas aquí si es necesario
    // ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];