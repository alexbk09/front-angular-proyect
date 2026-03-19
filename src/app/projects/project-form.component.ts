import { Component, Input, Output, EventEmitter, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from './proyecto.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  @Input() proyecto: Proyecto | null = null;
  @Output() save = new EventEmitter<FormData>();
  form: FormGroup;
  imagenPreview: Signal<string | null> = signal(null);

  constructor(private fb: FormBuilder) {
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
    if (this.proyecto) {
      this.form.patchValue(this.proyecto);
      this.imagenPreview.set(this.proyecto.imagen);
    }
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
      const formData = new FormData();
      Object.entries(this.form.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      this.save.emit(formData);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
