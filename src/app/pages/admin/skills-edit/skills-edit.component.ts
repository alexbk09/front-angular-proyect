import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Suponiendo que existe un servicio similar para skills
import { AdminSkillsApiService } from '../../../infrastructure/services/admin-skills-api.service';
import { Skill } from '../../../infrastructure/models/home-content.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'admin-skills-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsEditComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AdminSkillsApiService);

  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    skills: this.fb.array([])
  });

  get skillsArray(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  createSkillGroup(skill?: Skill): FormGroup {
    return this.fb.group({
      name: [skill?.name ?? '', Validators.required],
      category: [skill?.category ?? '', Validators.required],
      isFeatured: [skill?.isFeatured ?? false],
      order: [skill?.order ?? 0, Validators.required]
    });
  }

  addSkill() {
    this.skillsArray.push(this.createSkillGroup());
  }

  removeSkill(index: number) {
    this.skillsArray.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    const skills: Skill[] = this.skillsArray.value as Skill[];
    this.api.updateSkills({ skills })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.success.set(true);
        },
        error: () => {
          this.error.set('Error al guardar. Intenta de nuevo.');
        }
      });
  }
}
