import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ApiService)
  const router = inject(Router)
  return authService.verifyeToken().pipe(
    map(data => true), // Return true if token verification is successful
    catchError(err => {
      router.navigate(['login']); // Navigate to login if there's an error
      return of(false); // Return false indicating authentication failure
    })
  );

};
