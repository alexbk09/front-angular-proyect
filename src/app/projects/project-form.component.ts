import { Component, signal, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from './proyecto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './project.service';
import { ToastService } from './toast.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast.component';
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  form: FormGroup;
  imagenPreview: WritableSignal<string | null> = signal<string | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  editMode = false;
  proyectoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private projectService: ProjectService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tecnologias: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      imagen: [null],
      is_featured: [false],
      is_public: [true],
      is_draft: [false]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.proyectoId = +id;
        this.loading.set(true);
        this.projectService.getProyectos().subscribe({
          next: (proyectos) => {
            const proyecto = proyectos.find(p => p.id === this.proyectoId);
            if (proyecto) {
              this.form.patchValue(proyecto);
              this.imagenPreview.set(proyecto.imagen);
            }
            this.loading.set(false);
          },
          error: () => {
            this.error.set('Error al cargar el proyecto');
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
      if (this.editMode && this.proyectoId) {
        this.projectService.updateProyecto(this.proyectoId, formData).subscribe({
          next: () => {
            this.loading.set(false);
            this.toast.show('Proyecto actualizado correctamente', 'success');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: () => {
            this.error.set('Error al actualizar el proyecto');
            this.toast.show('Error al actualizar el proyecto', 'error');
            this.loading.set(false);
          }
        });
      } else {
        this.projectService.createProyecto(formData).subscribe({
          next: () => {
            this.loading.set(false);
            this.toast.show('Proyecto creado correctamente', 'success');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: () => {
            this.error.set('Error al crear el proyecto');
            this.toast.show('Error al crear el proyecto', 'error');
            this.loading.set(false);
          }
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
