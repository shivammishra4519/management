import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

 
  private customerDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private setting: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  public wallet:any;

  constructor(private service:ApiService) { }
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
  checkWallence(){
    this.service.checkBalance().subscribe({
      next:data=>{
        
        const amount=data.amount;
        const formattedAmount = amount.toFixed(2); // Returns a string with 2 decimal places
        this.wallet = parseFloat(formattedAmount);
       
      }
    })
  }

  

}
