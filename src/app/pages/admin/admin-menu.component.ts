import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'admin-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="flex flex-col gap-2 p-4 bg-white dark:bg-gray-900 rounded shadow mb-6">
      <a routerLink="/admin/hero" routerLinkActive="font-bold text-primary-600">Editar Hero</a>
      <a routerLink="/admin/hero-content-form" routerLinkActive="font-bold text-primary-600">Editar contenido de inicio</a>
      <a routerLink="/admin/editar-sobre-mi" routerLinkActive="font-bold text-primary-600">Editar Sobre Mí</a>
      <a routerLink="/admin/proyectos" routerLinkActive="font-bold text-primary-600">Proyectos</a>
      <a routerLink="/admin/testimonios" routerLinkActive="font-bold text-primary-600">Testimonios</a>
      <a routerLink="/admin/skills" routerLinkActive="font-bold text-primary-600">Editar Skills</a>
      <a routerLink="/admin/metrics" routerLinkActive="font-bold text-primary-600">Métricas</a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMenuComponent {}
