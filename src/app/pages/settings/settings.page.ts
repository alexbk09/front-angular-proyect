import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ThemeService } from '../../infrastructure/services/theme.service';

type ThemePreference = 'light' | 'dark' | 'system';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent],
  templateUrl: './settings.page.html'
})
export class SettingsPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly theme = inject(ThemeService);

  readonly form = this.fb.nonNullable.group({
    theme: ['system' as ThemePreference, [Validators.required]],
    language: ['', [Validators.maxLength(5)]]
  });

  readonly themeOptions: { value: ThemePreference; label: string }[] = [
    { value: 'system', label: 'Seguir al sistema' },
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' }
  ];

  isSaving = false;
  saveMessage: string | null = null;

  ngOnInit(): void {
    this.prefillFormFromStorage();
  }

  onSubmit(): void {
    if (this.isSaving || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.saveMessage = null;

    const { theme, language } = this.form.getRawValue();

    this.applyTheme(theme);
    this.persistLanguage(language ?? '');

    this.isSaving = false;
    this.saveMessage = 'Preferencias guardadas correctamente.';
  }

  private prefillFormFromStorage(): void {
    let theme: ThemePreference = 'system';

    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        theme = storedTheme;
      }

      const storedLanguage = window.localStorage.getItem('app_language') ?? '';
      this.form.patchValue({ language: storedLanguage });
    }

    this.form.patchValue({ theme }, { emitEvent: false });
  }

  private applyTheme(theme: ThemePreference): void {
    if (theme === 'dark') {
      this.theme.apply(true);
      return;
    }

    if (theme === 'light') {
      this.theme.apply(false);
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.apply(prefersDark);
    }
  }

  private persistLanguage(language: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('app_language', language.trim());
  }
}
