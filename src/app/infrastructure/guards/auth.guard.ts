import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  if (authState.isAuthenticated()) {
    return true;
  }

  // TODO: usar redirectTo después de login para volver a la URL original.
  return router.createUrlTree(['/auth'], {
    queryParams: { redirectTo: state.url }
  });
};
