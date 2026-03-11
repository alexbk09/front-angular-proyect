import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(false);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      const pref = localStorage.getItem('theme');
      const initial = pref === 'dark' || (!pref && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.apply(initial);
    }
  }

  toggle(): void {
    this.apply(!this.isDark());
  }

  apply(dark: boolean): void {
    this.isDark.set(dark);
    if (this.isBrowser) {
      const root = document.documentElement;
      root.classList.toggle('dark', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
  }
}
