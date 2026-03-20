import { Routes } from '@angular/router';
import { TestimonialListComponent } from './testimonial-list.component';
import { TestimonialFormComponent } from './testimonial-form.component';

export const TESTIMONIALS_ROUTES: Routes = [
  {
    path: '',
    component: TestimonialListComponent
  },
  {
    path: 'nuevo',
    component: TestimonialFormComponent
  },
  {
    path: 'editar/:id',
    component: TestimonialFormComponent
  }
];