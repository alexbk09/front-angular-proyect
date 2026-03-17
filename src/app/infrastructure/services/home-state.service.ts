import { Injectable, computed, signal, inject } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectsApiService } from './auth-api.service';

@Injectable({ providedIn: 'root' })
export class HomeStateService {
  private readonly projectsApi = inject(ProjectsApiService);

  private readonly projects = signal<Project[]>([]);

  readonly filter = signal<'all' | 'featured'>('all');

  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
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

  loadProjects(): void {
    this.status.set('loading');
    this.error.set(null);

    this.projectsApi.listProjects().subscribe({
      next: (response) => {
        const mapped: Project[] = response.data.map((dto) => ({
          id: String(dto.id),
          title: dto.title,
          description: dto.description,
          tags: dto.tags,
          highlight: dto.highlight
        }));

        this.projects.set(mapped);
        this.status.set('success');
      },
      error: () => {
        this.projects.set([]);
        this.setError('No se pudieron cargar los proyectos.');
      }
    });
  }
}
