import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricsService } from './metrics.service';
import { Metric } from './metrics.model';

@Component({
  selector: 'app-metrics-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="p-6">
      <h2 class="text-2xl font-bold mb-4">Métricas rápidas</h2>
      <button class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" (click)="openForm()">+ Nueva métrica</button>
      <div *ngIf="loading()" class="text-center py-8">Cargando...</div>
      <table *ngIf="!loading()" class="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Valor</th>
            <th class="px-4 py-2">Icono</th>
            <th class="px-4 py-2">Orden</th>
            <th class="px-4 py-2">Visible</th>
            <th class="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let metric of metrics()">
            <td>{{ metric.nombre }}</td>
            <td>{{ metric.valor }}</td>
            <td><span [innerHTML]="metric.icono"></span></td>
            <td>{{ metric.orden }}</td>
            <td>
              <span [ngClass]="{'text-green-600': metric.visible, 'text-red-600': !metric.visible}">
                {{ metric.visible ? 'Sí' : 'No' }}
              </span>
            </td>
            <td>
              <button class="text-blue-600 mr-2" (click)="editMetric(metric)">Editar</button>
              <button class="text-red-600" (click)="deleteMetric(metric.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal/formulario -->
      <div *ngIf="showForm()" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
          <h3 class="text-xl font-semibold mb-4">{{ editingMetric ? 'Editar' : 'Nueva' }} métrica</h3>
          <form (ngSubmit)="saveMetric()" #metricForm="ngForm">
            <label class="block mb-2">Nombre
              <input class="input" name="nombre" [(ngModel)]="form.nombre" required maxlength="255" />
            </label>
            <label class="block mb-2">Valor
              <input class="input" type="number" name="valor" [(ngModel)]="form.valor" required />
            </label>
            <label class="block mb-2">Icono (SVG o clase)
              <input class="input" name="icono" [(ngModel)]="form.icono" />
            </label>
            <label class="block mb-2">Orden
              <input class="input" type="number" name="orden" [(ngModel)]="form.orden" />
            </label>
            <label class="block mb-4">Visible
              <input type="checkbox" name="visible" [(ngModel)]="form.visible" />
            </label>
            <div class="flex gap-2 justify-end">
              <button type="button" class="px-4 py-2 bg-gray-200 rounded" (click)="closeForm()">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded" [disabled]="metricForm.invalid">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`.input { @apply border rounded px-2 py-1 w-full mb-2; }`]
})
export class MetricsAdminComponent implements OnInit {
  metrics = signal<Metric[]>([]);
  loading = signal(true);
  showForm = signal(false);
  form: Partial<Metric> = {};
  editingMetric: Metric | null = null;

  constructor(private metricsService: MetricsService) {}

  ngOnInit() {
    this.loadMetrics();
  }

  loadMetrics() {
    this.loading.set(true);
    this.metricsService.getAll().subscribe({
      next: (data) => {
        this.metrics.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openForm() {
    this.form = { visible: true };
    this.editingMetric = null;
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  editMetric(metric: Metric) {
    this.form = { ...metric };
    this.editingMetric = metric;
    this.showForm.set(true);
  }

  saveMetric() {
    if (this.editingMetric) {
      this.metricsService.update(this.editingMetric.id, this.form).subscribe(() => {
        this.loadMetrics();
        this.closeForm();
      });
    } else {
      this.metricsService.create(this.form).subscribe(() => {
        this.loadMetrics();
        this.closeForm();
      });
    }
  }

  deleteMetric(id: number) {
    if (confirm('¿Eliminar esta métrica?')) {
      this.metricsService.delete(id).subscribe(() => this.loadMetrics());
    }
  }
}
