
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs';

// Estructura adaptada a la respuesta real de /api/home
export interface SobreMi {
  nombre: string;
  descripcion: string;
  fotoUrl: string;
  contacto: string;
}
export interface ConfiguracionPortafolio {
  sobreMi: SobreMi;
  skills: string[];
  contacto: string;
  links: { label: string; url: string }[];
}

@Injectable({ providedIn: 'root' })
export class ConfiguracionPortafolioService {
  readonly configSignal;
  constructor(private http: HttpClient) {
    const config$ = this.http.get<any>('/api/home').pipe(
      map((apiResponse) => {
        // Adaptar la respuesta real a la estructura esperada
        const hero = apiResponse?.data?.hero || {};
        const about = apiResponse?.data?.about || {};
        const links = apiResponse?.data?.links || [];
        // Buscar email o contacto principal en links
        let contacto = '';
        if (Array.isArray(links)) {
          const emailLink = links.find((l: any) => l.type === 'email' || l.label?.toLowerCase().includes('mail'));
          contacto = emailLink?.url || '';
        }
        const sobreMi: SobreMi = {
          nombre: hero.title || '',
          descripcion: about.body || hero.description || '',
          fotoUrl: hero.avatarUrl || '',
          contacto
        };
        const skills = apiResponse?.data?.skills || [];
        return { data: { sobreMi, skills, contacto, links }, loading: false, error: null };
      }),
      startWith({ data: null, loading: true, error: null }),
      catchError(error => of({ data: null, loading: false, error }))
    );
    this.configSignal = toSignal(config$, { initialValue: { data: null, loading: true, error: null } });
  }
}
