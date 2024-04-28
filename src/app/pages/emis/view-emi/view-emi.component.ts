import { Component } from '@angular/core';
import { DatasharingService } from '../../../services/datasharing.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-view-emi',
  templateUrl: './view-emi.component.html',
  styleUrl: './view-emi.component.css'
})
export class ViewEmiComponent {
  customerData:any
  emidetails:any;
  emiarray:any;
  constructor(private dataService:DatasharingService,private service:ApiService,private router:Router){
    const encryptedLoanId = CryptoJS.AES.encrypt('kkkkkk', 'your_secret_key').toString();
    const encryptedEmiId = CryptoJS.AES.encrypt('lllll', 'your_secret_key').toString();

    // Encode the encrypted data to Base64
    const encodedLoanId = btoa(encryptedLoanId);
    const encodedEmiId = btoa(encryptedEmiId);
    // console.log("emiid=",encodedEmiId)
  }
 

  ngOnInit(): void {
    this.dataService.getCustomerData().pipe(
      switchMap(data => {
        this.customerData = data;
        console.log(data)
        return this.service.viewEmi(this.customerData);
      })
    ).subscribe({
      next: (res: any) => {
        this.emidetails = res;
       
        this.emiarray = this.emidetails.installments;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  downloadSlip(data: any): void {
    console.log('data',data)
    this.service.downloadInstallmentSlip(data).subscribe(response => {
      console.log(response)
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
    
      a.download = 'installment-slip.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading PDF:', error);
      // Handle error (e.g., display error message to user)
    });
  }
  
  
  viewSlip(data:any){
    this.router.navigate(['installment-slip'],{queryParams:{loanid:data.loanid,emiId:data.emiId}})
  }


  PayEmi(data:any){
    const obj={
      installmentId:data.installmentId,
      otherDetails:this.emidetails,
      amount:data.amount
    }
    
    this.dataService.setCustomerData(obj);
    this.router.navigate(['/dashboard/pay-emi']);

  }
}
