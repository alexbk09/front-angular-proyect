import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.page';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioPage },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES)
  },
  // Rutas futuras (lazy):
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./pages/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () =>
  //     import('./pages/profile/profile.routes').then((m) => m.PROFILE_ROUTES)
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./pages/settings/settings.routes').then((m) => m.SETTINGS_ROUTES)
  // }
];
