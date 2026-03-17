import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ProjectsApiService, ListProjectsResponse } from '../../infrastructure/services/auth-api.service';
import { ApiProjectDto } from '../../infrastructure/models/api-project.model';

type CatalogStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './catalog.page.html'
})
export class CatalogPage implements OnInit {
  private readonly projectsApi = inject(ProjectsApiService);

  readonly status = signal<CatalogStatus>('idle');
  readonly errorMessage = signal<string | null>(null);
  readonly projects = signal<ApiProjectDto[]>([]);

  readonly search = signal('');
  readonly selectedTag = signal<string | null>(null);
  readonly sortBy = signal<'recent' | 'title' | 'highlight'>('recent');

  readonly tags = computed(() => {
    const set = new Set<string>();
    for (const project of this.projects()) {
      for (const tag of project.tags) {
        set.add(tag);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  readonly filteredProjects = computed(() => {
    const search = this.search().toLowerCase().trim();
    const tag = this.selectedTag();
    const sortBy = this.sortBy();

    let items = [...this.projects()];

    if (search) {
      items = items.filter((project) => {
        return (
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search)
        );
      });
    }

    if (tag) {
      items = items.filter((project) => project.tags.includes(tag));
    }

    items.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === 'highlight') {
        return Number(b.highlight) - Number(a.highlight);
      }

      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return bTime - aTime;
    });

    return items;
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.status.set('loading');
    this.errorMessage.set(null);

    this.projectsApi.listProjects().subscribe({
      next: (response: ListProjectsResponse) => {
        this.projects.set(response.data);
        this.status.set('success');
      },
      error: () => {
        this.status.set('error');
        this.errorMessage.set('No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.');
      }
    });
  }

  onSearch(term: string): void {
    this.search.set(term);
  }

  clearSearch(): void {
    this.search.set('');
  }

  selectTag(tag: string | null): void {
    this.selectedTag.set(tag);
  }

  changeSort(value: 'recent' | 'title' | 'highlight'): void {
    this.sortBy.set(value);
  }
}
