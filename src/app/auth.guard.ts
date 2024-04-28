import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(ApiService);
  const url = environment.apiUrl;
  const http = inject(HttpClient);
  const router = inject(Router);

  try {
    // Check if localStorage is available before accessing it
    if (typeof localStorage !== 'undefined') {
      const jwtToken = localStorage.getItem('token'); 
      if (jwtToken) {
        const header = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
        const data = await http.post(`${url}api/verifytoken`, {}, { headers: header }).toPromise();
        return true; // Return true if token verification is successful
      } else {
        return false; // Return false if token is not found in localStorage
      }
    } else {
      // localStorage is not available, handle the situation accordingly
      console.warn('localStorage is not available.');
      return false;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return false; // Return false if an error occurs during token verification
  }
};


