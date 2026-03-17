import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { HomeStateService } from '../../infrastructure/services/home-state.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
  private readonly state = inject(HomeStateService);

  readonly projects = this.state.filteredProjects;
  readonly currentFilter = this.state.filter;
  readonly isLoading = this.state.isLoading;
  readonly errorMessage = this.state.error;
  readonly status = this.state.status;

  readonly isAllSelected = computed(() => this.currentFilter() === 'all');
  readonly isFeaturedSelected = computed(() => this.currentFilter() === 'featured');
  readonly hasError = computed(() => this.status() === 'error');

  ngOnInit(): void {
    this.state.loadProjects();
  }

  showAll(): void {
    this.state.setFilter('all');
  }

  showFeatured(): void {
    this.state.setFilter('featured');
  }

  reload(): void {
    this.state.loadProjects();
  }
}
