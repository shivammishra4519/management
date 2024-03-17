import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


export const employeeAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const role = authService.decodingRole();
  const router = inject(Router)
  if (role == 'employee') {
    return true;
  }
  else {
    router.navigate(['/dashboard/home']);
    return false;
  }

};
