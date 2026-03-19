import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import type { Testimonio } from './testimonial.model';
import { TestimonialsService } from './testimonials.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './toast.component';
import { TestimonialDeleteDialogComponent } from './testimonial-delete-dialog.component';
@Component({
  selector: 'app-testimonial-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent, TestimonialDeleteDialogComponent],
  templateUrl: './testimonial-list.component.html',
  // styleUrls: ['./testimonial-list.component.scss']
})
export class TestimonialListComponent implements OnInit {
  testimonios: WritableSignal<Testimonio[]> = signal<Testimonio[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  testimonioAEliminar: Testimonio | null = null;

  constructor(private testimonialsService: TestimonialsService, private router: Router, private toast: ToastService) {}

  ngOnInit() {
    this.fetchTestimonios();
  }

  fetchTestimonios() {
    this.loading.set(true);
    this.testimonialsService.getTestimonios().subscribe({
      next: (testimonios) => {
        this.testimonios.set(testimonios);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar testimonios');
        this.loading.set(false);
      }
    });
  }

  irANuevo() {
    this.router.navigate(['admin/testimonios/nuevo']);
  }

  irAEditar(testimonio: Testimonio) {
    this.router.navigate(['admin/testimonios/editar', testimonio.id]);
  }


  confirmarEliminar(testimonio: Testimonio) {
    this.testimonioAEliminar = testimonio;
  }

  cancelarEliminar() {
    this.testimonioAEliminar = null;
  }

  eliminarTestimonio() {
    if (!this.testimonioAEliminar) return;
    this.loading.set(true);
    this.testimonialsService.deleteTestimonio(this.testimonioAEliminar.id).subscribe({
      next: () => {
        this.fetchTestimonios();
        this.toast.show('Testimonio eliminado correctamente', 'success');
        this.testimonioAEliminar = null;
      },
      error: () => {
        this.error.set('Error al eliminar testimonio');
        this.toast.show('Error al eliminar testimonio', 'error');
        this.loading.set(false);
      }
    });
  }
}
