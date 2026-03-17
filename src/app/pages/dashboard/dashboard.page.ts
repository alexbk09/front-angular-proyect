import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DashboardFilter, DashboardStateService } from '../../infrastructure/services/dashboard-state.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './dashboard.page.html'
})
export class DashboardPage implements OnInit {
  private readonly dashboardState = inject(DashboardStateService);

  readonly metrics = this.dashboardState.metrics;
  readonly filter = this.dashboardState.filter;
  readonly paginatedItems = this.dashboardState.paginatedItems;
  readonly page = this.dashboardState.page;
  readonly totalPages = this.dashboardState.totalPages;
  readonly isLoading = this.dashboardState.isLoading;
  readonly totalItems = this.dashboardState.totalItems;

  readonly hasItems = computed(() => this.totalItems() > 0);

  ngOnInit(): void {
    this.dashboardState.loadMockData();
  }

  changeFilter(filter: DashboardFilter): void {
    this.dashboardState.setFilter(filter);
  }

  goToPage(page: number): void {
    const totalPages = this.totalPages();
    if (page < 1 || page > totalPages) {
      return;
    }

    this.dashboardState.setPage(page);
  }

  previousPage(): void {
    this.goToPage(this.page() - 1);
  }

  nextPage(): void {
    this.goToPage(this.page() + 1);
  }
}
