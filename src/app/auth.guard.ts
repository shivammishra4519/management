import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
      return true; // User is authenticated, allow navigation
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Deny navigation
    }
  }
}
