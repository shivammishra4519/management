import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewdetailsService {

  constructor(private http:HttpClient) { }
  url=environment.apiUrl;
;
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


  viewCustomer(): Observable<any> {
    return this.http.post(`${this.url}details/customer`, {}, { headers: this.getHeaders() });
  }

  viewDevices(): Observable<any> {
    return this.http.post(`${this.url}details/devices`, {}, { headers: this.getHeaders() });
  }

  viewSoldDevice(): Observable<any> {
    return this.http.post(`${this.url}details/solddevice`, {}, { headers: this.getHeaders() });
  }
  viewShops(): Observable<any> {
    return this.http.post(`${this.url}details/shops`, {}, { headers: this.getHeaders() });
  }

  viewEmployee(): Observable<any> {
    return this.http.post(`${this.url}details/employee`, {}, { headers: this.getHeaders() });
  }

  addBrand(data:any): Observable<any> {
    return this.http.post(`${this.url}brand/add`, data, { headers: this.getHeaders() });
  }

  viewBrand(): Observable<any> {
    return this.http.post(`${this.url}brand/view`, {}, { headers: this.getHeaders() });
  }

  currentCredit(): Observable<any> {
    return this.http.post(`${this.url}details/credit`, {}, { headers: this.getHeaders() });
  }

  getShopsWallet(): Observable<any> {
    return this.http.post(`${this.url}details/users/wallet`, {}, { headers: this.getHeaders() });
  }

  getEmployeeWallet(): Observable<any> {
    return this.http.post(`${this.url}details/employee/wallet`, {}, { headers: this.getHeaders() });
  }


  getDailyCollection(data:any): Observable<any> {
    return this.http.post(`${this.url}collection/find/dailycollection`, data, { headers: this.getHeaders() });
  }
  getAllDailyCollection(): Observable<any> {
    return this.http.post(`${this.url}collection/findall/dailycollection`, {}, { headers: this.getHeaders() });
  }

  getAllFIleCharge(): Observable<any> {
    return this.http.post(`${this.url}details/total/filecharge`, {}, { headers: this.getHeaders() });
  }
  
  getAllFIleChargeCurrentMonth(): Observable<any> {
    return this.http.post(`${this.url}details/total/filecharge/currentmonth`, {}, { headers: this.getHeaders() });
  }

  getAllCurrentCredittCurrentMonth(): Observable<any> {
    return this.http.post(`${this.url}details/total/currentcredit/currentmonth`, {}, { headers: this.getHeaders() });
  }

}
