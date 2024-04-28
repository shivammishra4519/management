import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.apiUrl;
  constructor( private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    let jwtToken: string | null = null;

    // Check if localStorage is available and get the token if it exists
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {

      jwtToken = localStorage.getItem('token'); // Get the token from localStorage
    } else {
      console.warn('Token not found in localStorage.');
    }

    console.log('Token retrieved from localStorage:', jwtToken); // Log the retrieved token

    return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
  }


  viewProfile(): Observable<any> {
    return this.http.post(`${this.url}profile/find`, {}, { headers: this.getHeaders() });
  }

  changePassword(data:any): Observable<any> {
    return this.http.post(`${this.url}profile/password/chanage`, data, { headers: this.getHeaders() });
  }

  changePin(data:any): Observable<any> {
    return this.http.post(`${this.url}profile/pin/chanage`, data, { headers: this.getHeaders() });
  }

  updateAddress(data:any): Observable<any> {
    return this.http.post(`${this.url}profile/update/address`, data, { headers: this.getHeaders() });
  }

}
