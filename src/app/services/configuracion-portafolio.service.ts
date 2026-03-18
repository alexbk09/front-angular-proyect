import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs';

export interface SobreMi {
  nombre: string;
  descripcion: string;
  fotoUrl: string;
  contacto: string;
}
export interface Contacto {
  email: string;
  redesSociales: string[];
}
export interface ConfiguracionPortafolio {
  sobreMi: SobreMi;
  skills: string[];
  contacto: Contacto;
}

@Injectable({ providedIn: 'root' })
export class ConfiguracionPortafolioService {
  readonly configSignal;
  constructor(private http: HttpClient) {
    const config$ = this.http.get<ConfiguracionPortafolio>('/api/configuracion-portafolio').pipe(
      map(data => ({ data, loading: false, error: null })),
      startWith({ data: null, loading: true, error: null }),
      catchError(error => of({ data: null, loading: false, error }))
    );
    this.configSignal = toSignal(config$, { initialValue: { data: null, loading: true, error: null } });
  }
}
