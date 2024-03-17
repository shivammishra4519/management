import { CanActivateFn } from '@angular/router';

export const userAuthGaurdGuard: CanActivateFn = (route, state) => {
  return true;
};
