import { Routes } from '@angular/router';
import { RequestsComponent } from './components/requests/requests.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './cors/guards/auth.guard';
import { AuthLoginGuard } from './cors/guards/auth-login.guard';

export const routes: Routes = [
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: '',
    redirectTo: 'requests',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];
