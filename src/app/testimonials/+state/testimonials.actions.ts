import { createAction, props } from '@ngrx/store';
import { Testimonio } from '../testimonial.model';

export const loadTestimonials = createAction('[Testimonials] Load Testimonials');
export const loadTestimonialsSuccess = createAction('[Testimonials] Load Testimonials Success', props<{ testimonios: Testimonio[] }>());
export const loadTestimonialsFailure = createAction('[Testimonials] Load Testimonials Failure', props<{ error: string }>());

export const addTestimonial = createAction('[Testimonials] Add Testimonial', props<{ data: FormData }>());
export const addTestimonialSuccess = createAction('[Testimonials] Add Testimonial Success', props<{ testimonio: Testimonio }>());
export const addTestimonialFailure = createAction('[Testimonials] Add Testimonial Failure', props<{ error: string }>());

export const updateTestimonial = createAction('[Testimonials] Update Testimonial', props<{ id: number, data: FormData }>());
export const updateTestimonialSuccess = createAction('[Testimonials] Update Testimonial Success', props<{ testimonio: Testimonio }>());
export const updateTestimonialFailure = createAction('[Testimonials] Update Testimonial Failure', props<{ error: string }>());

export const deleteTestimonial = createAction('[Testimonials] Delete Testimonial', props<{ id: number }>());
export const deleteTestimonialSuccess = createAction('[Testimonials] Delete Testimonial Success', props<{ id: number }>());
export const deleteTestimonialFailure = createAction('[Testimonials] Delete Testimonial Failure', props<{ error: string }>());
