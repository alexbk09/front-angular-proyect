import { Injectable, computed, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class HomeStateService {
  private readonly projects = signal<Project[]>([
    {
      id: 'p1',
      title: 'Landing page personal',
      description: 'Página de inicio optimizada con Tailwind y Angular Signals.',
      tags: ['Angular 21', 'TailwindCSS', 'Signals'],
      highlight: true
    },
    {
      id: 'p2',
      title: 'Dashboard de métricas',
      description: 'Dashboard con tarjetas, gráficos y manejo de estado reactivo.',
      tags: ['Componentes UI', 'Estado local'],
      highlight: true
    },
    {
      id: 'p3',
      title: 'Formularios avanzados',
      description: 'Flujos multi-step con validaciones reactivas listas para escalar.',
      tags: ['Forms', 'UX', 'Validaciones'],
      highlight: false
    }
  ]);

  readonly filter = signal<'all' | 'featured'>('all');

  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('success');
  readonly error = signal<string | null>(null);

  readonly isLoading = computed(() => this.status() === 'loading');

  readonly filteredProjects = computed(() => {
    const list = this.projects();
    const filter = this.filter();

    if (filter === 'featured') {
      return list.filter((p) => p.highlight);
    }
    return list;
  });

  setFilter(filter: 'all' | 'featured'): void {
    this.filter.set(filter);
  }

  setError(message: string): void {
    this.error.set(message);
    this.status.set('error');
  }

  clearError(): void {
    this.error.set(null);
    this.status.set('success');
  }
}
