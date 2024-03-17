import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: ApiService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.service.verifyeToken().pipe(
      map((data) => {
        if (data) {
          return true; // User is authenticated, allow navigation
        } else {
          this.router.navigate(['/login']); // Redirect to login page
          return false; // Deny navigation
        }
      })
    );
  }
}
