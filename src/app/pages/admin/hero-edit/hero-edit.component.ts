import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminHomeSettingsApiService } from '../../../infrastructure/services/admin-home-settings-api.service';
import { HomeHero, HomeLink } from '../../../infrastructure/models/home-content.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'admin-hero-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEditComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AdminHomeSettingsApiService);

  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    subtitle: ['', [Validators.required, Validators.maxLength(100)]],
    role: ['', [Validators.required, Validators.maxLength(40)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    avatarUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]],
    location: ['', [Validators.required, Validators.maxLength(60)]],
    links: this.fb.array([])
  });

  get linksArray(): FormArray {
    return this.form.get('links') as FormArray;
  }

  createLinkGroup(link?: HomeLink): FormGroup {
    return this.fb.group({
      type: [link?.type ?? '', Validators.required],
      label: [link?.label ?? '', Validators.required],
      url: [link?.url ?? '', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      icon: [link?.icon ?? null]
    });
  }

  addLink() {
    this.linksArray.push(this.createLinkGroup());
  }

  removeLink(index: number) {
    this.linksArray.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    const hero: HomeHero = {
      title: this.form.value.title!,
      subtitle: this.form.value.subtitle!,
      role: this.form.value.role!,
      description: this.form.value.description!,
      avatarUrl: this.form.value.avatarUrl!,
      location: this.form.value.location!
    };
    const links: HomeLink[] = this.linksArray.value as HomeLink[];

    this.api.updateHeroSettings({ hero, links })
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
