import { Injectable, computed, signal } from '@angular/core';

export type DashboardFilter = 'all' | 'featured' | 'recent';

export interface DashboardMetrics {
  totalProjects: number;
  featuredProjects: number;
  recentProjects: number;
  totalViews: number;
}

export interface DashboardItem {
  id: string;
  title: string;
  highlight: boolean;
  createdAt: string;
  tags: string[];
  views: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardStateService {
  private readonly items = signal<DashboardItem[]>([]);

  readonly metrics = signal<DashboardMetrics | null>(null);
  readonly filter = signal<DashboardFilter>('all');
  readonly page = signal<number>(1);
  readonly pageSize = signal<number>(5);

  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  readonly isLoading = computed(() => this.status() === 'loading');

  readonly filteredItems = computed(() => {
    const items = this.items();
    const filter = this.filter();

    if (filter === 'featured') {
      return items.filter((item) => item.highlight);
    }

    if (filter === 'recent') {
      const now = new Date();
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

      return items.filter((item) => {
        const createdAt = new Date(item.createdAt).getTime();
        return now.getTime() - createdAt <= THIRTY_DAYS;
      });
    }

    return items;
  });

  readonly totalItems = computed(() => this.filteredItems().length);

  readonly totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    if (!total || !size) {
      return 1;
    }

    return Math.max(1, Math.ceil(total / size));
  });

  readonly paginatedItems = computed(() => {
    const list = this.filteredItems();
    const page = this.page();
    const size = this.pageSize();

    const start = (page - 1) * size;
    return list.slice(start, start + size);
  });

  loadMockData(): void {
    this.status.set('loading');

    const mockItems: DashboardItem[] = [
      {
        id: '1',
        title: 'Portfolio Web Personal',
        highlight: true,
        createdAt: new Date().toISOString(),
        tags: ['Angular', 'Tailwind', 'SPA'],
        views: 1240
      },
      {
        id: '2',
        title: 'API REST de Inventario',
        highlight: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Node.js', 'REST', 'PostgreSQL'],
        views: 860
      },
      {
        id: '3',
        title: 'Dashboard Analytics',
        highlight: true,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Angular', 'Charts', 'NgRx'],
        views: 1520
      },
      {
        id: '4',
        title: 'Landing Page Producto SaaS',
        highlight: false,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['SEO', 'Marketing', 'Responsive'],
        views: 430
      },
      {
        id: '5',
        title: 'Microservicio de Pagos',
        highlight: true,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['NestJS', 'Payments', 'Stripe'],
        views: 980
      },
      {
        id: '6',
        title: 'Sistema de Reservas',
        highlight: false,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        tags: ['Fullstack', 'Angular', 'Node.js'],
        views: 640
      }
    ];

    const totalProjects = mockItems.length;
    const featuredProjects = mockItems.filter((item) => item.highlight).length;

    const now = new Date();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    const recentProjects = mockItems.filter((item) => {
      const createdAt = new Date(item.createdAt).getTime();
      return now.getTime() - createdAt <= THIRTY_DAYS;
    }).length;

    const totalViews = mockItems.reduce((acc, item) => acc + item.views, 0);

    this.items.set(mockItems);
    this.metrics.set({
      totalProjects,
      featuredProjects,
      recentProjects,
      totalViews
    });

    this.status.set('success');
  }

  setFilter(filter: DashboardFilter): void {
    this.filter.set(filter);
    this.page.set(1);
  }

  setPage(page: number): void {
    this.page.set(page);
  }
}
