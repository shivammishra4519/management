import { Component } from '@angular/core';
import { DatasharingService } from '../../../services/datasharing.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
    
  }
 

  ngOnInit(): void {
    this.dataService.getCustomerData().pipe(
      switchMap(data => {
        this.customerData = data;
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

  downloadSlip(data:any){
    this.service.downloadInstallmentSlip(data).subscribe(res=>{
      console.log(res)
    })
  }
  
  viewSlip(data:any){
    this.router.navigate(['installment-slip'],{queryParams:{loanid:data.loanId,emiId:data.emiId}})
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
