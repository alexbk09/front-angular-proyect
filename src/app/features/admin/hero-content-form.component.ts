import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HeroContentService } from '../../core/services/hero-content.service';
import { AdminMenuComponent } from '../../pages/admin/admin-menu.component';

@Component({
  selector: 'admin-hero-content-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminMenuComponent],
  template: `
    <div class="max-w-xl mx-auto">
      <admin-menu></admin-menu>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label class="block font-semibold mb-1">Mensaje principal</label>
        <input formControlName="mainMessage" class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block font-semibold mb-1">Subtítulo (stack)</label>
        <input formControlName="subtitle" class="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label class="block font-semibold mb-1">Problemas que resuelves</label>
        <div formArrayName="problems" class="space-y-2">
          <div *ngFor="let ctrl of problems.controls; let i = index" class="flex gap-2 items-center">
            <input [formControlName]="i" class="flex-1 border rounded px-3 py-2" />
            <button type="button" (click)="removeProblem(i)" class="text-red-600">Eliminar</button>
          </div>
        </div>
        <button type="button" (click)="addProblem()" class="mt-2 px-2 py-1 bg-primary-600 text-white rounded">Agregar problema</button>
      </div>
      <div>
        <label class="block font-semibold mb-1">CTA principal</label>
        <input formControlName="cta" class="w-full border rounded px-3 py-2" />
      </div>
      <button type="submit" [disabled]="form.invalid" class="px-4 py-2 bg-primary-600 text-white rounded">Guardar</button>
      <span *ngIf="success()" class="text-green-600 ml-4">¡Guardado!</span>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroContentFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly heroContent = inject(HeroContentService);
  success = signal(false);

  form = this.fb.group({
    mainMessage: ['', Validators.required],
    subtitle: ['', Validators.required],
    problems: this.fb.array([]),
    cta: ['', Validators.required]
  });

  get problems() {
    return this.form.get('problems') as FormArray;
  }

  constructor() {
    const content = this.heroContent.content();
    this.form.patchValue({
      mainMessage: content.mainMessage,
      subtitle: content.subtitle,
      cta: content.cta
    });
    content.problems.forEach(p => this.problems.push(this.fb.control(p, Validators.required)));
  }

  addProblem() {
    this.problems.push(this.fb.control('', Validators.required));
  }

  removeProblem(i: number) {
    this.problems.removeAt(i);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.heroContent.updateContent({
      mainMessage: this.form.value.mainMessage!,
      subtitle: this.form.value.subtitle!,
      problems: this.problems.value,
      cta: this.form.value.cta!
    });
    this.success.set(true);
    setTimeout(() => this.success.set(false), 2000);
  }
}
