  {
    path: 'about-content-form',
    loadComponent: () => import('../../features/admin/about-content-form.component').then(m => m.AboutContentFormComponent),
    canActivate: [authGuard]
  },
import { Routes } from '@angular/router';
import { authGuard } from '../../infrastructure/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'hero',
    loadComponent: () => import('./hero-edit/hero-edit.component').then(m => m.HeroEditComponent),
    canActivate: [authGuard]
  },
  {
    path: 'hero-content-form',
    loadComponent: () => import('../../features/admin/hero-content-form.component').then(m => m.HeroContentFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'proyectos',
    loadComponent: () => import('../../projects/project-list.component').then(m => m.ProjectListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'skills',
    loadComponent: () => import('./skills-edit/skills-edit.component').then(m => m.SkillsEditComponent),
    canActivate: [authGuard]
  },
];
