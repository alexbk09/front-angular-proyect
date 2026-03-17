import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponseDto, AuthUserDto } from '../models/api-auth.model';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  readonly isAuthenticated = signal<boolean>(false);
  readonly user = signal<AuthUserDto | null>(null);

  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.initFromStorage();
  }

  initFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // En SSR/no navegador no hay localStorage.
      this.isAuthenticated.set(false);
      this.user.set(null);
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const rawUser = localStorage.getItem(AUTH_USER_KEY);

    if (token) {
      this.isAuthenticated.set(true);
      if (rawUser) {
        try {
          const parsed: AuthUserDto = JSON.parse(rawUser);
          this.user.set(parsed);
        } catch {
          // Si el JSON está corrupto, limpiamos solo el usuario.
          this.user.set(null);
        }
      }
    } else {
      this.isAuthenticated.set(false);
      this.user.set(null);
    }
  }

  setSession(auth: AuthResponseDto): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Evitar tocar localStorage en entornos sin navegador.
      this.isAuthenticated.set(true);
      this.user.set(auth.user);
      return;
    }

    localStorage.setItem(AUTH_TOKEN_KEY, auth.token);
    // TODO: validar si es necesario cifrar o firmar la info del usuario en el storage.
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(auth.user));

    this.isAuthenticated.set(true);
    this.user.set(auth.user);
  }

  clearSession(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isAuthenticated.set(false);
      this.user.set(null);
      return;
    }

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);

    this.isAuthenticated.set(false);
    this.user.set(null);
  }
}
