import { Component, Signal, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimonialsService } from './testimonials.service';
import { Testimonio } from './testimonial.model';

@Component({
  selector: 'app-testimonial-form',
  standalone: true,
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.scss']
})
export class TestimonialFormComponent implements OnInit {
  form: FormGroup;
  imagenPreview: Signal<string | null> = signal(null);
  loading = signal(false);
  error = signal<string | null>(null);
  editMode = false;
  testimonioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testimonialsService: TestimonialsService
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
              this.imagenPreview.set(testimonio.imagen);
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
          formData.append(key, value);
        }
      });
      if (this.editMode && this.testimonioId) {
        this.testimonialsService.updateTestimonio(this.testimonioId, formData).subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: () => {
            this.error.set('Error al actualizar el testimonio');
            this.loading.set(false);
          }
        });
      } else {
        this.testimonialsService.createTestimonio(formData).subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: () => {
            this.error.set('Error al crear el testimonio');
            this.loading.set(false);
          }
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
