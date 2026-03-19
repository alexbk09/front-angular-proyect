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
      <a routerLink="/admin/about-content-form" routerLinkActive="font-bold text-primary-600">Editar Sobre mí</a>
      <a routerLink="/admin/skills" routerLinkActive="font-bold text-primary-600">Editar Skills</a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMenuComponent {}
