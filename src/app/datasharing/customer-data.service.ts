import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private customerDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private guarantor: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  setCustomerData(data: any) {
    this.customerDataSubject.next(data);
  }

  getCustomerData() {
    return this.customerDataSubject.asObservable();
  }

  setGuarantorData(data: any) {
    this.guarantor.next(data);
  }
  getGuarantorData() {
    return this.guarantor.asObservable();
  }


}
