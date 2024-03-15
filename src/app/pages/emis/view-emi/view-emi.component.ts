import { Component } from '@angular/core';
import { DatasharingService } from '../../../services/datasharing.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

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
  
    this.dataService.getCustomerData().subscribe(data => {
      this.customerData = data;
      this.service.viewEmi(this.customerData).subscribe({
        next: (res: any) => {
          this.emidetails = res;
          this.emiarray=this.emidetails.installments;
        },
        error: err => {
          console.log(err);
        }
      });
    });
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
