import { Routes } from '@angular/router';
import { authGuard } from '../../infrastructure/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'hero',
    loadComponent: () => import('./hero-edit/hero-edit.component').then(m => m.HeroEditComponent),
    canActivate: [authGuard]
  },
  {
    path: 'skills',
    loadComponent: () => import('./skills-edit/skills-edit.component').then(m => m.SkillsEditComponent),
    canActivate: [authGuard]
  },
];
