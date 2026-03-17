import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ProfileApiService, UpdateProfilePayload } from '../../infrastructure/services/auth-api.service';
import { UserProfileDto } from '../../infrastructure/models/api-user-profile.model';
import { ThemeService } from '../../infrastructure/services/theme.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent],
  templateUrl: './profile.page.html'
})
export class ProfilePage implements OnInit {
  private readonly profileApi = inject(ProfileApiService);
  private readonly fb = inject(FormBuilder);
  private readonly theme = inject(ThemeService);

  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly errorMessage = signal<string | null>(null);
  readonly profile = signal<UserProfileDto | null>(null);

  readonly isEditing = signal(false);
  readonly isSaving = signal(false);
  readonly saveErrorMessage = signal<string | null>(null);
  readonly saveSuccessMessage = signal<string | null>(null);

  readonly themeOptions = [
    { value: 'system', label: 'Sistema' },
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' }
  ] as const;

  readonly profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    bio: [''],
    avatarUrl: [''],
    location: [''],
    websiteUrl: [''],
    preferences: this.fb.group({
      theme: ['system' as 'light' | 'dark' | 'system'],
      language: ['']
    })
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.status.set('loading');
    this.errorMessage.set(null);

    this.profileApi.getProfile().subscribe({
      next: (response) => {
        this.profile.set(response.data);
        this.patchFormFromProfile(response.data);
        this.status.set('success');
      },
      error: () => {
        this.status.set('error');
        this.errorMessage.set('No se pudo cargar tu perfil. Inténtalo de nuevo.');
      }
    });
  }

  startEditing(): void {
    const current = this.profile();
    if (!current) {
      return;
    }

    this.saveErrorMessage.set(null);
    this.saveSuccessMessage.set(null);
    this.patchFormFromProfile(current);
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    const current = this.profile();
    if (current) {
      this.patchFormFromProfile(current);
    }
    this.isEditing.set(false);
  }

  onSubmitProfile(): void {
    if (this.isSaving()) {
      return;
    }

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const current = this.profile();
    if (!current) {
      return;
    }

    this.isSaving.set(true);
    this.saveErrorMessage.set(null);
    this.saveSuccessMessage.set(null);

    const formValue = this.profileForm.value;

    const payload: UpdateProfilePayload = {
      name: formValue.name ?? undefined,
      email: formValue.email ?? undefined,
      bio: formValue.bio ?? null,
      avatarUrl: formValue.avatarUrl ?? null,
      location: formValue.location ?? null,
      websiteUrl: formValue.websiteUrl ?? null,
      preferences: {
        theme: (formValue.preferences?.theme ?? undefined) as 'light' | 'dark' | 'system' | undefined,
        language: formValue.preferences?.language ?? null
      }
    };

    this.profileApi.updateProfile(payload).subscribe({
      next: (response) => {
        const updated = response.data;
        this.profile.set(updated);
        this.patchFormFromProfile(updated);
        this.isSaving.set(false);
        this.isEditing.set(false);
        this.saveSuccessMessage.set(response.message || 'Perfil actualizado correctamente.');

        const newTheme = updated.profile?.preferences?.theme;
        if (newTheme === 'dark') {
          this.theme.apply(true);
        } else if (newTheme === 'light') {
          this.theme.apply(false);
        }
      },
      error: () => {
        this.isSaving.set(false);
        this.saveErrorMessage.set('No se pudo guardar los cambios. Inténtalo de nuevo.');
      }
    });
  }

  private patchFormFromProfile(data: UserProfileDto): void {
    const profile = data.profile;
    const preferences = profile?.preferences ?? {};

    this.profileForm.patchValue({
      name: data.user.name ?? '',
      email: data.user.email ?? '',
      bio: profile?.bio ?? '',
      avatarUrl: profile?.avatarUrl ?? '',
      location: profile?.location ?? '',
      websiteUrl: profile?.websiteUrl ?? '',
      preferences: {
        theme: preferences.theme ?? 'system',
        language: preferences.language ?? ''
      }
    });

    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
  }
}
