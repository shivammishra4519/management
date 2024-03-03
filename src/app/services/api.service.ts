import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:3000/"; // Corrected URL format

  customerRegister(data: any): Observable<any> {
    return this.http.post(`${this.url}customer/register`, data); // Return the observable
  }

  login(data:any): Observable<any> {
return this.http.post(`${this.url}api/login`, data)
  }

  uploadImage(data:any): Observable<any> {
    return this.http.post(`${this.url}api/upload`, data)
  }
}
