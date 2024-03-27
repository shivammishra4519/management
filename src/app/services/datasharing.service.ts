import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

 
  private customerDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private setting: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  

  constructor() { }
 public isManageDevice=false;

  setCustomerData(data: any) {
    this.customerDataSubject.next(data);
  }

  getCustomerData() {
    return this.customerDataSubject.asObservable();
  }

  setSetting(data:any){
    this.setting.next(data);
  }
  getSetting(){
    return this.setting.asObservable();
  }

}
