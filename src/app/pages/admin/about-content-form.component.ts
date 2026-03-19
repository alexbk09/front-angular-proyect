import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracionPortafolioService } from '../../services/configuracion-portafolio.service';
import { AdminMenuComponent } from './admin-menu.component';

@Component({
  selector: 'admin-about-content-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminMenuComponent],
  template: `
    <div class="max-w-xl mx-auto">
      <admin-menu></admin-menu>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 p-4 bg-white rounded shadow">
        <div>
          <label class="block font-semibold mb-1">Nombre</label>
          <input formControlName="nombre" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block font-semibold mb-1">Descripción</label>
          <textarea formControlName="descripcion" class="w-full border rounded px-3 py-2"></textarea>
        </div>
        <div>
          <label class="block font-semibold mb-1">Foto (URL)</label>
          <input formControlName="fotoUrl" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block font-semibold mb-1">Contacto</label>
          <input formControlName="contacto" class="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" [disabled]="form.invalid" class="px-4 py-2 bg-primary-600 text-white rounded">Guardar</button>
        <span *ngIf="success()" class="text-green-600 ml-4">¡Guardado!</span>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutContentFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly configService = inject(ConfiguracionPortafolioService);
  success = signal(false);

  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    fotoUrl: ['', Validators.required],
    contacto: ['', Validators.required]
  });

  constructor() {
    // Cargar datos actuales
    const config = this.configService.configSignal();
    if (config && config.data && config.data.sobreMi) {
      this.form.patchValue(config.data.sobreMi);
    }
  }

  onSubmit() {
    // Aquí deberías llamar a un servicio para guardar los cambios en el backend
    this.success.set(true);
    setTimeout(() => this.success.set(false), 2000);
  }
}
