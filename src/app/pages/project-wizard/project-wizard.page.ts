import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

type WizardStep = 1 | 2 | 3;

@Component({
  selector: 'app-project-wizard-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent],
  templateUrl: './project-wizard.page.html'
})
export class ProjectWizardPage {
  private readonly fb = new FormBuilder();

  readonly currentStep = signal<WizardStep>(1);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    tags: ['', [Validators.required]],
    githubUrl: ['', [Validators.required]],
    demoUrl: [''],
    highlight: [false]
  });

  readonly isFirstStep = computed(() => this.currentStep() === 1);
  readonly isLastStep = computed(() => this.currentStep() === 3);

  readonly canGoNext = computed(() => {
    const step = this.currentStep();
    if (step === 1) {
      return this.form.controls.title.valid && this.form.controls.description.valid;
    }
    if (step === 2) {
      return this.form.controls.tags.valid && this.form.controls.githubUrl.valid;
    }
    return true;
  });

  readonly summary = computed(() => this.form.getRawValue());

  successMessage: string | null = null;

  next(): void {
    if (!this.canGoNext()) {
      this.form.markAllAsTouched();
      return;
    }

    const step = this.currentStep();
    if (step < 3) {
      this.currentStep.set((step + 1) as WizardStep);
    }
  }

  back(): void {
    const step = this.currentStep();
    if (step > 1) {
      this.currentStep.set((step - 1) as WizardStep);
    }
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.successMessage = 'Proyecto preparado correctamente (modo demo, sin enviar aún al backend).';
  }
}
