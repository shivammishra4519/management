import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serchloan',
  templateUrl: './serchloan.component.html',
  styleUrl: './serchloan.component.css'
})
export class SerchloanComponent {
  data: any;
  parmsData:any;
 
  constructor(private service: ApiService, private toastr: ToastrService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.parmsData = params;
    });
    this.service.findLoanByAny(this.parmsData).subscribe({
      next:data=>{
        this.data=data; 
      },
      error:err=>{
        this.toastr.error("No Loan Exit With This details")
      }
    })
  }





  get upcomingInstallments() {
    return this.data.installments.filter((installment: any) => !installment.paid);
  }

  payNow(data: any) {
 
    this.service.payInstallmentOnline(data).subscribe({
      next: (res) => {
        
        if (res  && res.paymentUrl) {
          window.location.href = res.paymentUrl;
        } else {
          this.toastr.error('Failed to get payment URL');
        }
      },
      error: (err) => {
     
        this.toastr.error('Error processing payment',err);
      }
    });
  }

}


