import { Component, Input } from '@angular/core';
import { Metric } from './metrics.model';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-metrics-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="w-full py-8 bg-gray-50">
      <div class="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        <ng-container *ngFor="let metric of metrics">
          <div class="flex flex-col items-center bg-white rounded-lg shadow p-4 transition hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500" tabindex="0" aria-label="{{metric.nombre}}: {{metric.valor}}">
            <span class="text-4xl mb-2" [innerHTML]="metric.icono"></span>
            <span class="text-2xl font-bold text-gray-800">{{ metric.valor }}</span>
            <span class="text-sm text-gray-500">{{ metric.nombre }}</span>
          </div>
        </ng-container>
      </div>
    </section>
  `,
  styles: []
})
export class MetricsHomeComponent {
  @Input() metrics: Metric[] = [];
}
