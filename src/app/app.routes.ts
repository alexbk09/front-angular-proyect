import { Routes } from '@angular/router';
import { authGuard } from './infrastructure/guards/auth.guard';
import { InicioPage } from './pages/inicio/inicio.page';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES)
  },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioPage },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then((m) => m.HOME_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/profile/profile.routes').then((m) => m.PROFILE_ROUTES)
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/settings/settings.routes').then((m) => m.SETTINGS_ROUTES)
  },
  {
    path: 'contacto-form',
    loadComponent: () => import('./components/contacto/formulario-contacto.component').then(m => m.FormularioContactoComponent)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES)
  },
  {
    path: 'sobre-mi',
    loadComponent: () => import('./components/sobre-mi/sobre-mi.component').then(m => m.SobreMiComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./components/skills/skills.component').then(m => m.SkillsComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./components/contacto/contacto.component').then(m => m.ContactoComponent)
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./proyectos/proyectos.component').then(m => m.ProyectosComponent)
  },
  {
    path: 'projects/wizard',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/project-wizard/project-wizard.routes').then((m) => m.PROJECT_WIZARD_ROUTES)
  },
  {
    path: 'notifications',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/notifications/notifications.routes').then((m) => m.NOTIFICATIONS_ROUTES)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
