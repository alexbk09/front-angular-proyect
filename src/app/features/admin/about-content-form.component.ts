import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HeroContentService } from '../../core/services/hero-content.service';

export interface AboutContent {
  paragraph: string;
  highlights: string[];
}

@Component({
  selector: 'admin-about-content-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 max-w-xl mx-auto p-4 bg-white rounded shadow">
      <div>
        <label class="block font-semibold mb-1">Párrafo principal</label>
        <textarea formControlName="paragraph" rows="4" class="w-full border rounded px-3 py-2"></textarea>
      </div>
      <div>
        <label class="block font-semibold mb-1">Logros o highlights</label>
        <div formArrayName="highlights" class="space-y-2">
          <div *ngFor="let ctrl of highlights.controls; let i = index" class="flex gap-2 items-center">
            <input [formControlName]="i" class="flex-1 border rounded px-3 py-2" />
            <button type="button" (click)="removeHighlight(i)" class="text-red-600">Eliminar</button>
          </div>
        </div>
        <button type="button" (click)="addHighlight()" class="mt-2 px-2 py-1 bg-primary-600 text-white rounded">Agregar logro</button>
      </div>
      <button type="submit" [disabled]="form.invalid" class="px-4 py-2 bg-primary-600 text-white rounded">Guardar</button>
      <span *ngIf="success()" class="text-green-600 ml-4">¡Guardado!</span>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutContentFormComponent {
  private readonly fb = inject(FormBuilder);
  // Para demo, reutilizamos HeroContentService. En real, crear AboutContentService.
  private readonly heroContent = inject(HeroContentService);
  success = signal(false);

  form = this.fb.group({
    paragraph: ['', Validators.required],
    highlights: this.fb.array([])
  });

  get highlights() {
    return this.form.get('highlights') as FormArray;
  }

  constructor() {
    // Demo: cargar datos mock. En real, usar servicio dedicado.
    const about = { paragraph: 'Busco proyectos de alto impacto donde la calidad y la experiencia de usuario sean prioridad.', highlights: ['Implementación de CI/CD', 'Optimización de performance', 'Automatización de pruebas'] };
    this.form.patchValue({ paragraph: about.paragraph });
    about.highlights.forEach(h => this.highlights.push(this.fb.control(h, Validators.required)));
  }

  addHighlight() {
    this.highlights.push(this.fb.control('', Validators.required));
  }

  removeHighlight(i: number) {
    this.highlights.removeAt(i);
  }

  onSubmit() {
    if (this.form.invalid) return;
    // Aquí guardarías en el servicio real
    this.success.set(true);
    setTimeout(() => this.success.set(false), 2000);
  }
}
