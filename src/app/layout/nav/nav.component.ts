import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../infrastructure/services/theme.service';
import { AuthStateService } from '../../infrastructure/services/auth-state.service';
import { AuthApiService } from '../../infrastructure/services/auth-api.service';

@Component({
  selector: 'layout-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  openAdmin = false;
  open = signal(false);
  toggle() { this.open.update(v => !v); }
  close() { this.open.set(false); }

  private readonly theme = inject(ThemeService);
  isDark = this.theme.isDark;
  toggleTheme() { this.theme.toggle(); }

  private readonly authState = inject(AuthStateService);
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  readonly isAuthenticated = this.authState.isAuthenticated;

  logout(): void {
    this.authApi.logout().subscribe({
      next: () => {
        this.authState.clearSession();
        this.router.navigateByUrl('/auth');
      },
      error: () => {
        // Incluso si el backend falla, limpiamos sesión en el cliente.
        this.authState.clearSession();
        this.router.navigateByUrl('/auth');
      }
    });
  }
}
