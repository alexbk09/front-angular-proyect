import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionPortafolioService } from '../../services/configuracion-portafolio.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-6 md:p-12 bg-white rounded-xl shadow-md transition-all">
      <ng-container *ngIf="config().loading">
        <div class="animate-pulse h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
        <div class="animate-pulse h-4 w-1/3 bg-gray-200 rounded"></div>
      </ng-container>
      <ng-container *ngIf="config().error">
        <p class="text-red-600">Error cargando contacto.</p>
      </ng-container>
      <ng-container *ngIf="config().data as data">
        <h2 class="text-2xl font-bold mb-4">Contacto</h2>
        <ul class="space-y-2">
          <li *ngIf="data.contacto"><span class="font-semibold">Email:</span> <a [href]="'mailto:' + data.contacto">{{ data.contacto }}</a></li>
          <li *ngFor="let red of data.links">
            <span class="font-semibold">Red:</span> <a [href]="red.url" class="text-blue-600 hover:underline" target="_blank" rel="noopener">{{ red.label }}</a>
          </li>
        </ul>
      </ng-container>
    </section>
  `
})
export class ContactoComponent {
  config;
  constructor(private configService: ConfiguracionPortafolioService) {
    this.config = this.configService.configSignal;
  }
}
