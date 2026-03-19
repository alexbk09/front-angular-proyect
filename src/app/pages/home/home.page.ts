import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { HomeStateService } from '../../infrastructure/services/home-state.service';
import { MetricsHomeComponent } from '../../metrics/metrics-home.component';
import { MetricsService } from '../../metrics/metrics.service';
import { Metric } from '../../metrics/metrics.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, MetricsHomeComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
  private readonly state = inject(HomeStateService);
  private readonly metricsService = inject(MetricsService);

  readonly projects = this.state.filteredProjects;
  readonly currentFilter = this.state.filter;
  readonly isLoading = this.state.isLoading;
  readonly errorMessage = this.state.error;
  readonly status = this.state.status;

  readonly isAllSelected = computed(() => this.currentFilter() === 'all');
  readonly isFeaturedSelected = computed(() => this.currentFilter() === 'featured');
  readonly hasError = computed(() => this.status() === 'error');

  metrics = signal<Metric[]>([]);

  ngOnInit(): void {
    this.state.loadProjects();
    this.metricsService.getAll().subscribe({
      next: (data) => this.metrics.set(data.filter(m => m.visible).sort((a, b) => a.orden - b.orden)),
      error: () => this.metrics.set([])
    });
  }

  showAll(): void {
    this.state.setFilter('all');
  }

  showFeatured(): void {
    this.state.setFilter('featured');
  }

  reload(): void {
    this.state.loadProjects();
    this.metricsService.getAll().subscribe({
      next: (data) => this.metrics.set(data.filter(m => m.visible).sort((a, b) => a.orden - b.orden)),
      error: () => this.metrics.set([])
    });
  }
}
