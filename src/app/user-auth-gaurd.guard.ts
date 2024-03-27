import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const userAuthGaurdGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const role = authService.decodingRole();
  const router = inject(Router)
  if (role == 'user') {
    return true;
  }
  else {
    router.navigate(['/dashboard/home']);
    return false;
  }
};
