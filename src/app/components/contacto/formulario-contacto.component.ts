import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Component({
  selector: 'app-formulario-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="p-6 md:p-12 bg-white rounded-xl shadow-md max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-4">Formulario de Contacto</h2>
      <form (ngSubmit)="enviar()" #form="ngForm" novalidate>
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Nombre</label>
          <input type="text" name="nombre" [(ngModel)]="nombre" required minlength="2" maxlength="50" class="w-full border rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Email</label>
          <input type="email" name="email" [(ngModel)]="email" required class="w-full border rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Mensaje</label>
          <textarea name="mensaje" [(ngModel)]="mensaje" required minlength="10" maxlength="500" class="w-full border rounded px-3 py-2"></textarea>
        </div>
        <button type="submit" [disabled]="loading()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Enviar</button>
      </form>
      <div *ngIf="success()" class="mt-4 text-green-600">{{ success() }}</div>
      <div *ngIf="error()" class="mt-4 text-red-600">{{ error() }}</div>
    </section>
  `
})
export class FormularioContactoComponent {
  nombre = '';
  email = '';
  mensaje = '';
  loading = signal(false);
  success = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  enviar() {
    this.loading.set(true);
    this.success.set(null);
    this.error.set(null);
    this.http.post<any>('/api/contacto', {
      nombre: this.nombre,
      email: this.email,
      mensaje: this.mensaje
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.success.set(res.message);
          this.nombre = '';
          this.email = '';
          this.mensaje = '';
        } else {
          this.error.set(res.errors?.[0]?.message || 'Error al enviar');
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error de red o servidor');
        this.loading.set(false);
      }
    });
  }
}
