import { Injectable, signal } from '@angular/core';

export interface HeroContent {
  mainMessage: string;
  subtitle: string;
  problems: string[];
  cta: string;
}

const STORAGE_KEY = 'heroContent';
const DEFAULT_CONTENT: HeroContent = {
  mainMessage: 'Desarrollador web que crea soluciones a medida para empresas y startups.',
  subtitle: 'Angular · Laravel · Tailwind · Node.js',
  problems: [
    'Dashboards y paneles de control',
    'Portales internos y sistemas de gestión',
    'Landing pages y sitios corporativos',
    'Integraciones API y automatización'
  ],
  cta: 'Ver proyectos'
};

@Injectable({ providedIn: 'root' })
export class HeroContentService {
  private _content = signal<HeroContent>(this.load() ?? DEFAULT_CONTENT);
  readonly content = this._content.asReadonly();

  updateContent(newContent: HeroContent) {
    this._content.set(newContent);
    this.save(newContent);
  }

  private save(content: HeroContent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }

  private load(): HeroContent | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
