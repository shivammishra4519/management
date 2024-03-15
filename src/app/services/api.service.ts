import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = "http://localhost:3000/";
  jwtToken = this.cookieService.get('jwtToken');
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders(): HttpHeaders {
    const jwtToken = localStorage.getItem('token');
    console.log(jwtToken)
    return new HttpHeaders().set("Authorization", `bearer ${jwtToken}`);
  }


  // headers = new HttpHeaders().set("Authorization", `bearer ${this.jwtToken}`)

  customerRegister(data: any): Observable<any> {
    return this.http.post(`${this.url}customer/register`, data, { headers: this.getHeaders() });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}api/login`, data);
  }

  uploadImage(data: any): Observable<any> {
    return this.http.post(`${this.url}api/upload`, data, { headers: this.getHeaders() });
  }

  userRegister(data: any): Observable<any> {
    return this.http.post(`${this.url}api/register`, data, { headers: this.getHeaders() });
  }

  addDevice(data: any): Observable<any> {
    return this.http.post(`${this.url}api/add-device`, data, { headers: this.getHeaders() });
  }

  viewModel(): Observable<any> {
    return this.http.post(`${this.url}api/viewbrand`, {}, { headers: this.getHeaders() });
  }

  viewDeviceData(data: any): Observable<any> {
    return this.http.post(`${this.url}api/viewdevicedata`, data, { headers: this.getHeaders() });
  }

  sellDeviceApi(data: any): Observable<any> {
    return this.http.post(`${this.url}api/selldevice`, data, { headers: this.getHeaders() });
  }

  customerListView(): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `bearer ${this.jwtToken}`);
    return this.http.post(`${this.url}customer/list`,{},{ headers: this.getHeaders() });
  }

  viewProfile(data: any): Observable<any> {
    return this.http.post(`${this.url}customer/profile`, data, { headers: this.getHeaders() });
  }

  viewSellDevicesList(): Observable<any> {
    return this.http.post(`${this.url}api/viwdevicelist`, {}, { headers: this.getHeaders() });
  }

  viewEmi(number: any): Observable<any> {
    return this.http.post(`${this.url}emi/details`, number);
  }

  payEmi(data: any): Observable<any> {
    return this.http.post(`${this.url}emi/pay`, data, { headers: this.getHeaders() });
  }

  viewPaidEmi(): Observable<any> {
    return this.http.post(`${this.url}emi/viewpaidemi`, {}, { headers: this.getHeaders() });
  }

  filterSoldDevice(data: any): Observable<any> {
    return this.http.post(`${this.url}api/filter`, data, { headers: this.getHeaders() });
  }

  employeeRegister(data: any): Observable<any> {
    return this.http.post(`${this.url}employee/register`, data, { headers: this.getHeaders() });
  }

  fundTransfer(data: any): Observable<any> {
    return this.http.post(`${this.url}fund/transfer`, data, { headers: this.getHeaders() });
  }

  getUserList(): Observable<any> {
    return this.http.post(`${this.url}api/getuser`, {}, { headers: this.getHeaders() });
  }

  getFundDetails(): Observable<any> {
    return this.http.post(`${this.url}fund/details`, {}, { headers: this.getHeaders() });
  }


  checkBalance(): Observable<any> {
    return this.http.post(`${this.url}wallet/amount`, {}, { headers: this.getHeaders() });
  }

  getAllUserList(): Observable<any> {
    return this.http.post(`${this.url}api/getuserlist`, {}, { headers: this.getHeaders() });
  }


  imageView(imageName: string): Observable<Blob> {
    return this.http.post(`${this.url}api/images`, { fileName: imageName }, {
      responseType: 'blob',
      observe: 'response',
      headers: this.getHeaders()
    }).pipe(
      map((response: HttpResponse<Blob>) => response.body || new Blob())
    );
  }



  

}
