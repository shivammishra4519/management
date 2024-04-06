import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private customerDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  setCustomerData(data: any) {
    this.customerDataSubject.next(data);
  }

  getCustomerData() {
    return this.customerDataSubject.asObservable();
  }
}
