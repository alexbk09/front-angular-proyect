import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { HomeContent } from '../../infrastructure/models/home-content.model';
import { HomeContentApiService } from '../../infrastructure/services/home-content-api.service';

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, CardComponent],
  templateUrl: './inicio.page.html'
})
export class InicioPage implements OnInit {
  private readonly homeApi = inject(HomeContentApiService);

  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly errorMessage = signal<string | null>(null);
  readonly content = signal<HomeContent | null>(null);
  readonly isLoading = computed(() => this.status() === 'loading');

  ngOnInit(): void {
    this.loadHomeContent();
  }

  private loadHomeContent(): void {
    this.status.set('loading');
    this.errorMessage.set(null);

    this.homeApi.getHomeContent().subscribe({
      next: (data) => {
        this.content.set(data);
        this.status.set('success');
      },
      error: () => {
        // Si el backend aún no está listo, usamos datos mock.
        this.homeApi.getMockHomeContent().subscribe({
          next: (mock) => {
            this.content.set(mock);
            this.status.set('success');
          },
          error: () => {
            this.status.set('error');
            this.errorMessage.set('No se pudo cargar el contenido inicial.');
          }
        });
      }
    });
  }
}
