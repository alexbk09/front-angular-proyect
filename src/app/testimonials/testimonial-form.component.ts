import { Component, signal, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimonialsService } from './testimonials.service';
import { ToastService } from './toast.service';
import { ToastComponent } from './toast.component';
import { Testimonio } from './testimonial.model';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-testimonial-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastComponent],
  templateUrl: './testimonial-form.component.html',
  // styleUrls: ['./testimonial-form.component.scss']
})
export class TestimonialFormComponent implements OnInit {
  form: FormGroup;
  imagenPreview: WritableSignal<string | null> = signal<string | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  editMode = false;
  testimonioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private testimonialsService: TestimonialsService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
      mensaje: ['', Validators.required],
      imagen: [null],
      is_public: [true]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.testimonioId = +id;
        this.loading.set(true);
        this.testimonialsService.getTestimonios().subscribe({
          next: (testimonios) => {
            const testimonio = testimonios.find(t => t.id === this.testimonioId);
            if (testimonio) {
              this.form.patchValue(testimonio);
              this.imagenPreview.set(testimonio.imagen ?? null);
            }
            this.loading.set(false);
          },
          error: () => {
            this.error.set('Error al cargar el testimonio');
            this.loading.set(false);
          }
        });
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ imagen: file });
      const reader = new FileReader();
      reader.onload = () => this.imagenPreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading.set(true);
      const formData = new FormData();
      Object.entries(this.form.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (typeof value === 'string' || value instanceof Blob) {
            formData.append(key, value);
          }
        }
      });
      const handleError = (err: any, accion: string) => {
        let msg = `Error al ${accion} el testimonio`;
        if (err?.error?.message) {
          msg = err.error.message;
        } else if (typeof err?.error === 'string') {
          msg = err.error;
        } else if (typeof err?.error === 'object' && err?.error !== null) {
          // Si el backend devuelve un objeto con errores de validación
          msg = Object.values(err.error).flat().join(' | ');
        }
        this.error.set(msg);
        this.toast.show(msg, 'error');
        this.loading.set(false);
      };
      if (this.editMode && this.testimonioId) {
        this.testimonialsService.updateTestimonio(this.testimonioId, formData).subscribe({
          next: () => {
            this.loading.set(false);
            this.toast.show('Testimonio actualizado correctamente', 'success');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (err) => handleError(err, 'actualizar')
        });
      } else {
        this.testimonialsService.createTestimonio(formData).subscribe({
          next: () => {
            this.loading.set(false);
            this.toast.show('Testimonio creado correctamente', 'success');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (err) => handleError(err, 'crear')
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
