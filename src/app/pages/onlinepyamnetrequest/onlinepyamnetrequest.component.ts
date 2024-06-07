import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-onlinepyamnetrequest',
  templateUrl: './onlinepyamnetrequest.component.html',
  styleUrl: './onlinepyamnetrequest.component.css'
})
export class OnlinepyamnetrequestComponent implements OnInit {
  transactions: any;
  constructor(private service: ApiService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.service.onlinepaymentRequest().subscribe(res => {
      console.log(res)
      this.transactions = res.result;
    })
  }


  chechStatus(transaction: any) {
    this.service.paymentStatus({ order_id: transaction.order_id }).subscribe({
      next:data=>{
        if (data.result.status == 'SUCCESS') {
          this.toastr.success(data.result.status)
          this.service.verifyOnlinePayment(transaction).subscribe(res => {
            this.toastr.success('EMI UPDATED');
          }, error => {
            this.toastr.error(error.error.message)
          });
        } else {
          this.toastr.warning('Payment Status:', data.result.status)
        }
      },error:err=>{
        this.toastr.error(err.error.message)
      }
    })
  }
}
