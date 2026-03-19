import { Component, OnInit, Signal, signal } from '@angular/core';
import { Testimonio } from './testimonial.model';
import { TestimonialsService } from './testimonials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial-list',
  standalone: true,
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.scss']
})
export class TestimonialListComponent implements OnInit {
  testimonios: Signal<Testimonio[]> = signal([]);
  loading = signal(true);
  error = signal<string | null>(null);
  testimonioAEliminar: Testimonio | null = null;

  constructor(private testimonialsService: TestimonialsService, private router: Router) {}

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
        this.testimonioAEliminar = null;
      },
      error: () => {
        this.error.set('Error al eliminar testimonio');
        this.loading.set(false);
      }
    });
  }
}
