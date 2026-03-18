import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionPortafolioService } from '../../services/configuracion-portafolio.service';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-6 md:p-12 bg-white rounded-xl shadow-md transition-all">
      <ng-container *ngIf="config().loading">
        <div class="animate-pulse h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div class="animate-pulse h-4 w-1/2 bg-gray-200 rounded"></div>
      </ng-container>
      <ng-container *ngIf="config().error">
        <p class="text-red-600">Error cargando información.</p>
      </ng-container>
      <ng-container *ngIf="config().data as data">
        <h2 class="text-2xl font-bold mb-4">Sobre mí</h2>
        <img [src]="data.sobreMi.fotoUrl" alt="Foto" class="w-32 h-32 rounded-full mb-4 mx-auto">
        <p class="text-gray-700 text-center">{{ data.sobreMi.descripcion }}</p>
        <div class="mt-4 text-center">
          <span class="font-semibold">Contacto:</span> {{ data.sobreMi.contacto }}
        </div>
      </ng-container>
    </section>
  `
})
export class SobreMiComponent {
  config;
  constructor(private configService: ConfiguracionPortafolioService) {
    this.config = this.configService.configSignal;
  }
}
