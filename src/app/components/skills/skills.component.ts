import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionPortafolioService } from '../../services/configuracion-portafolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-6 md:p-12 bg-white rounded-xl shadow-md transition-all">
      <ng-container *ngIf="config().loading">
        <div class="flex gap-2">
          <div class="animate-pulse h-8 w-20 bg-gray-200 rounded" *ngFor="let i of [1,2,3,4]"></div>
        </div>
      </ng-container>
      <ng-container *ngIf="config().error">
        <p class="text-red-600">Error cargando skills.</p>
      </ng-container>
      <ng-container *ngIf="config().data as data">
        <h2 class="text-2xl font-bold mb-4">Skills</h2>
        <ul class="flex flex-wrap gap-2">
          <li *ngFor="let skill of data.skills" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition hover:bg-blue-200">
            {{ skill }}
          </li>
        </ul>
      </ng-container>
    </section>
  `
})
export class SkillsComponent {
  config;
  constructor(private configService: ConfiguracionPortafolioService) {
    this.config = this.configService.configSignal;
  }
}
