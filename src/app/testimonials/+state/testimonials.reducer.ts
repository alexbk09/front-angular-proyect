import { createReducer, on } from '@ngrx/store';
import * as TestimonialsActions from './testimonials.actions';
import { Testimonio } from '../testimonial.model';

export interface TestimonialsState {
  testimonios: Testimonio[];
  loading: boolean;
  error: string | null;
}

export const initialState: TestimonialsState = {
  testimonios: [],
  loading: false,
  error: null
};

export const testimonialsReducer = createReducer(
  initialState,
  on(TestimonialsActions.loadTestimonials, (state) => ({ ...state, loading: true, error: null })),
  on(TestimonialsActions.loadTestimonialsSuccess, (state, { testimonios }) => ({ ...state, testimonios, loading: false })),
  on(TestimonialsActions.loadTestimonialsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(TestimonialsActions.addTestimonialSuccess, (state, { testimonio }) => ({ ...state, testimonios: [testimonio, ...state.testimonios] })),
  on(TestimonialsActions.updateTestimonialSuccess, (state, { testimonio }) => ({
    ...state,
    testimonios: state.testimonios.map(t => t.id === testimonio.id ? testimonio : t)
  })),
  on(TestimonialsActions.deleteTestimonialSuccess, (state, { id }) => ({
    ...state,
    testimonios: state.testimonios.filter(t => t.id !== id)
  })),

  on(TestimonialsActions.addTestimonialFailure, TestimonialsActions.updateTestimonialFailure, TestimonialsActions.deleteTestimonialFailure, (state, { error }) => ({ ...state, error }))
);
