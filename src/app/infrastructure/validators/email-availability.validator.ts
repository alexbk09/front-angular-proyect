import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

// Validador asíncrono de ejemplo. En un siguiente paso puede conectarse
// al backend (endpoint de comprobación de email) usando AuthApiService.
export function emailAvailabilityValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = (control.value as string | null) ?? '';

    if (!value.trim()) {
      return of(null);
    }

    return timer(300).pipe(
      map(() => null)
    );
  };
}
