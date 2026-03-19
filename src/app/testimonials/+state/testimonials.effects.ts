import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TestimonialsService } from '../testimonials.service';
import * as TestimonialsActions from './testimonials.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TestimonialsEffects {
  loadTestimonials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestimonialsActions.loadTestimonials),
      mergeMap(() =>
        this.testimonialsService.getTestimonios().pipe(
          map(testimonios => TestimonialsActions.loadTestimonialsSuccess({ testimonios })),
          catchError(error => of(TestimonialsActions.loadTestimonialsFailure({ error: error.message || 'Error cargando testimonios' })))
        )
      )
    )
  );

  addTestimonial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestimonialsActions.addTestimonial),
      mergeMap(({ data }) =>
        this.testimonialsService.createTestimonio(data).pipe(
          map(testimonio => TestimonialsActions.addTestimonialSuccess({ testimonio })),
          catchError(error => of(TestimonialsActions.addTestimonialFailure({ error: error.message || 'Error creando testimonio' })))
        )
      )
    )
  );

  updateTestimonial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestimonialsActions.updateTestimonial),
      mergeMap(({ id, data }) =>
        this.testimonialsService.updateTestimonio(id, data).pipe(
          map(testimonio => TestimonialsActions.updateTestimonialSuccess({ testimonio })),
          catchError(error => of(TestimonialsActions.updateTestimonialFailure({ error: error.message || 'Error actualizando testimonio' })))
        )
      )
    )
  );

  deleteTestimonial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestimonialsActions.deleteTestimonial),
      mergeMap(({ id }) =>
        this.testimonialsService.deleteTestimonio(id).pipe(
          map(() => TestimonialsActions.deleteTestimonialSuccess({ id })),
          catchError(error => of(TestimonialsActions.deleteTestimonialFailure({ error: error.message || 'Error eliminando testimonio' })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private testimonialsService: TestimonialsService
  ) {}
}
