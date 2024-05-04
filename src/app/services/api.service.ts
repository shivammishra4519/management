import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.apiUrl;

  jwtToken = this.cookieService.get('jwtToken');
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getHeaders(): HttpHeaders {
    let jwtToken: string | null = null;
  
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
      jwtToken = localStorage.getItem('token'); // Get the token from localStorage
      console.log('Token retrieved from localStorage:', jwtToken); // Log the retrieved token
    } else {
      console.warn('Token not found in localStorage.');
    }
  
    // Add error handling for null token
    if (jwtToken !== null) {
      // Handle the case where the token is found
      return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    } else {
      // Handle the case where the token is not found
      // For example, you can return an HttpHeaders object without the Authorization header
      return new HttpHeaders();
    }
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
    // const headers = new HttpHeaders().set("Authorization", `bearer ${this.jwtToken}`);
    return this.http.post(`${this.url}customer/list`, {}, { headers: this.getHeaders() });
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
  sendOtp(data: any): Observable<any> {
    return this.http.post(`${this.url}api/send-otp`, data, { headers: this.getHeaders() });
  }
  verifyeOtp(data: any): Observable<any> {
    return this.http.post(`${this.url}api/verify-otp`, data, { headers: this.getHeaders() });
  }

  verifyeToken(): Observable<any> {

    return this.http.post(`${this.url}api/verifytoken`, {}, { headers: this.getHeaders() });
  }

  setTemplate(data: any): Observable<any> {
    return this.http.post(`${this.url}sms/settemplate`, data, { headers: this.getHeaders() });
  }

  viewTemplate(): Observable<any> {
    return this.http.post(`${this.url}sms/viewtemplate`, {}, { headers: this.getHeaders() });
  }

  deleteTemplate(data: any): Observable<any> {
    return this.http.post(`${this.url}sms/deletetemplate`, data, { headers: this.getHeaders() });
  }


  getTemplateByType(data: any): Observable<any> {
    return this.http.post(`${this.url}sms/gettemplate`, data, { headers: this.getHeaders() });
  }


  saveSmsInDb(data: any): Observable<any> {
    return this.http.post(`${this.url}sms/savesms`, data, { headers: this.getHeaders() });
  }

  checkUser(data: any): Observable<any> {
    return this.http.post(`${this.url}forget/check`, data);
  }

  getSmsAll(): Observable<any> {
    return this.http.post(`${this.url}sms/getsms`, {}, { headers: this.getHeaders() });
  }

  createNewPassword(data: any): Observable<any> {
    return this.http.post(`${this.url}forget/update`, data,);
  }
  saveConactSms(data: any): Observable<any> {
    return this.http.post(`${this.url}conactus/save`, data,);
  }

  viewAllDevice(): Observable<any> {
    return this.http.post(`${this.url}api/viewalldevice`, {}, { headers: this.getHeaders() });
  }

  viewAllShopName(): Observable<any> {
    return this.http.post(`${this.url}shops/names`, {}, { headers: this.getHeaders() });
  }

  getState(): Observable<any> {
    return this.http.post(`${this.url}api/state`, {}, { headers: this.getHeaders() });
  }

  filterCustomer(data: any): Observable<any> {
    return this.http.post(`${this.url}customer/filter`, data, { headers: this.getHeaders() });
  }


  verifyCustomer(data: any): Observable<any> {
    return this.http.post(`${this.url}customer/verify`, data, { headers: this.getHeaders() });
  }

  registerGuarantor(data: any): Observable<any> {
    return this.http.post(`${this.url}guarantor/register`, data, { headers: this.getHeaders() });
  }

  checkIsCustomer(data: any): Observable<any> {
    return this.http.post(`${this.url}customer/check/customer`, data, { headers: this.getHeaders() });
  }

  updateStatus(data: any): Observable<any> {
    return this.http.post(`${this.url}api/updatestatus`, data, { headers: this.getHeaders() });
  }

  walletCheck(data: any): Observable<any> {
    return this.http.post(`${this.url}api/wallet/user`, data, { headers: this.getHeaders() });
  }

  fundHistoryByAdmin(): Observable<any> {
    return this.http.post(`${this.url}api/fund/history`, {}, { headers: this.getHeaders() });
  }
  fundReciveByAdmin(): Observable<any> {
    return this.http.post(`${this.url}api/fund/history/recive`, {}, { headers: this.getHeaders() });
  }

  checkGauartor(data: any): Observable<any> {
    return this.http.post(`${this.url}guarantor/check`, data, { headers: this.getHeaders() });
  }
  viewGauarntorList(): Observable<any> {
    return this.http.post(`${this.url}guarantor/view/list`, {}, { headers: this.getHeaders() });
  }

  viewDeviceByCustomerId(data: any): Observable<any> {
    return this.http.post(`${this.url}api/viewdevicebyid`, data, { headers: this.getHeaders() });
  }

  viewCustomerImageName(data: any): Observable<any> {
    return this.http.post(`${this.url}customer/view/image`, data, { headers: this.getHeaders() });
  }

  viewLoanByLoanId(data: any): Observable<any> {
    return this.http.post(`${this.url}emi/viewloan`, data, { headers: this.getHeaders() });
  }

  getEmployeeList(): Observable<any> {
    return this.http.post(`${this.url}employee/list`, {}, { headers: this.getHeaders() });
  }

  downloadInstallmentSlip(data: any): Observable<any> {
    return this.http.get(`${this.url}pdf/installment-slip?loanId=${data.loanId}&emiId=${data.emiId}`, { responseType: 'blob' });
  }
  downloadTermsCondition(data: any): Observable<any> {
    return this.http.get(`${this.url}pdf/terms-conditon?number=${data.number} `, { responseType: 'blob' });
  }

  downloadAggrement(data: any): Observable<any> {
    return this.http.get(`${this.url}pdf/aggrement?customerId=${data.customerId}&shopId=${data.shopId}&loanId=${data.loanId} `, { responseType: 'blob' });
  }
  
  downloadInvoice(data: any): Observable<any> {
    return this.http.get(`${this.url}pdf/download/invoice?loanId=${data.loanId}&invoice=${data.invoice}`, { responseType: 'blob' });
  }
  
  
  downloadGaurntorAgreement(data: any): Observable<any> {
    return this.http.get(`${this.url}pdf/download/gaurantor?number=${data.number}`, { responseType: 'blob' });
  }
  // pdf/download/gaurantor?number=5426859625
  exportLoanInExcel(): Observable<any> {
    return this.http.get(`${this.url}files/download`, {headers: this.getHeaders() , responseType: 'blob' });
  }

  viewGuarantorByNumber(data: any): Observable<any> {
    return this.http.post(`${this.url}guarantor/view/guarantor`, data, { headers: this.getHeaders() });
  }

  viewAllEmi(): Observable<any> {
    return this.http.post(`${this.url}emi/viewallemi`, {}, { headers: this.getHeaders() });
  }
  viewAlldevice(): Observable<any> {
    return this.http.post(`${this.url}api/viewalldevicesold`, {}, { headers: this.getHeaders() });
  }

  findadminId(): Observable<any> {
    return this.http.post(`${this.url}api/find/adminid`, {}, { headers: this.getHeaders() });
  }

  filterDataByDate(data:any): Observable<any> {
    return this.http.post(`${this.url}api/filter/device`, data, { headers: this.getHeaders() });
  }

  dataForInvoice(data:any): Observable<any> {
    return this.http.post(`${this.url}pdf/data/invoice`, data, { headers: this.getHeaders() });
  }


  settleCollection(data:any): Observable<any> {
    return this.http.post(`${this.url}collection/settle/collection`, data, { headers: this.getHeaders() });
  }
 
  findAllcSettleCollection(): Observable<any> {
    return this.http.post(`${this.url}collection/find/collection`, {}, { headers: this.getHeaders() });
  }

  findAllCollectionWallet(): Observable<any> {
    return this.http.post(`${this.url}collection/find/wallets`, {}, { headers: this.getHeaders() });
  }
  findPlaceOfShopAndCustomer(data:any): Observable<any> {
    return this.http.post(`${this.url}pdf/data/aggrement`, data, { headers: this.getHeaders() });
  }

  findAdminDetails(): Observable<any> {
    return this.http.post(`${this.url}pdf/admin/details`, {}, { headers: this.getHeaders() });
  }
  findLoanDetails(data:any): Observable<any> {
    return this.http.post(`${this.url}pdf/loand/details`, data, { headers: this.getHeaders() });
  }

  verfyGaurantor(data:any): Observable<any> {
    return this.http.post(`${this.url}guarantor/verify/guarantor`, data, { headers: this.getHeaders() });
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

  imageViewGaurntor(imageName: string): Observable<Blob> {
    return this.http.post(`${this.url}guarantor/images/guarantor`, { fileName: imageName }, {
      responseType: 'blob',
      observe: 'response',
      headers: this.getHeaders()
    }).pipe(
      map((response: HttpResponse<Blob>) => response.body || new Blob())
    );
  }


  sendOtTonNumber(data: any) {
    const apiUrl = data.smsApiUrl;
    const queryParams = `?key=${environment.key}&campaign=${environment.campaign}&routeid=${environment.routeid}&type=${environment.type}&contacts=${data.contact}&senderid=${environment.senderid}&msg=${data.msg}&template_id=${data.template_id}&pe_id=${environment.pe_id}`;
    const url = `${apiUrl}${queryParams}`;
    return this.http.get(url)
  }

  verifyAdhar(data: any): Observable<any> {
    return this.http.post(`${this.url}adhar/sendOtp`, data);
  }

  verifyAdharOtp(data: any): Observable<any> {
    return this.http.post(`${this.url}adhar/verify-otp`, data);
  }

  verifyPan(data: any): Observable<any> {
    return this.http.post(`${this.url}adhar/verify-pan`, data);
  }




}
