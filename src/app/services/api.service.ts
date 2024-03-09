import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // url = "http://localhost:3000/"; // Corrected URL format
  url = "http://62.72.56.135:3000/"; // Corrected URL format

  customerRegister(data: any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.url}customer/register`, data,{ headers: headers }); // Return the observable
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}api/login`, data)
  }

  uploadImage(data: any): Observable<any> {
    return this.http.post(`${this.url}api/upload`, data)
  }

  userRegister(data:any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.url}api/register`, data,{ headers: headers })
  }


  addDevice(data:any): Observable<any> {
    return this.http.post(`${this.url}api/add-device`, data)
  }

  viewModel(): Observable<any> {
    return this.http.post(`${this.url}api/viewbrand`,{})
  }

  viewDeviceData(data:any): Observable<any> {
    return this.http.post(`${this.url}api/viewdevicedata`,data)
  }

  sellDeviceApi(data:any): Observable<any> {
    return this.http.post(`${this.url}api/selldevice`,data)
  }

  customerListView(): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.url}customer/list`,{},{ headers: headers })
  }

  viewProfile(data:any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.url}customer/profile`,data,{ headers: headers })
  }

  


  imageView(imageName: string): Observable<any> {
    console.log(imageName)
    return this.http.post(`${this.url}api/images`,{fileName: imageName })
  }

}
