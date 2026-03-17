import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthApiService } from '../../infrastructure/services/auth-api.service';
import { AuthStateService } from '../../infrastructure/services/auth-state.service';
import { LoginPayload, RegisterPayload } from '../../infrastructure/models/api-auth.model';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, RouterLink],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss'
})
export class AuthPage {
  private readonly fb = inject(FormBuilder);
  private readonly authApi = inject(AuthApiService);
  private readonly authState = inject(AuthStateService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly mode = signal<'login' | 'register'>('login');
  readonly isLoginMode = computed(() => this.mode() === 'login');

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  readonly registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
    role: ['freelancer' as RegisterPayload['role'], [Validators.required]]
  });

  switchToLogin(): void {
    this.mode.set('login');
    this.errorMessage.set(null);
  }

  switchToRegister(): void {
    this.mode.set('register');
    this.errorMessage.set(null);
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const payload: LoginPayload = this.loginForm.getRawValue();

    this.authApi.login(payload).subscribe({
      next: (response) => {
        this.authState.setSession(response);
        // TODO: persist user info en un UserStore global si es necesario.
        this.isSubmitting.set(false);
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') ?? '/dashboard';
        this.router.navigateByUrl(redirectTo);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        if (error.status === 401 || error.status === 422) {
          this.errorMessage.set('Credenciales inválidas o datos incompletos.');
        } else {
          this.errorMessage.set('No se pudo iniciar sesión. Inténtalo más tarde.');
        }
      }
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid || this.isSubmitting()) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { password, password_confirmation } = this.registerForm.getRawValue();
    if (password !== password_confirmation) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const payload: RegisterPayload = this.registerForm.getRawValue();

    this.authApi.register(payload).subscribe({
      next: (response) => {
        this.authState.setSession(response);
        // TODO: persist user info en un UserStore global si es necesario.
        this.isSubmitting.set(false);
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') ?? '/dashboard';
        this.router.navigateByUrl(redirectTo);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        if (error.status === 401 || error.status === 422) {
          this.errorMessage.set('Revisa los datos del formulario.');
        } else {
          this.errorMessage.set('No se pudo crear la cuenta. Inténtalo más tarde.');
        }
      }
    });
  }
}
