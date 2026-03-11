import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../infrastructure/services/theme.service';

@Component({
  selector: 'layout-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  open = signal(false);
  toggle() { this.open.update(v => !v); }
  close() { this.open.set(false); }

  private readonly theme = inject(ThemeService);
  isDark = this.theme.isDark;
  toggleTheme() { this.theme.toggle(); }
}
