import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settle-employee',
  templateUrl: './settle-employee.component.html',
  styleUrl: './settle-employee.component.css'
})
export class SettleEmployeeComponent {
  data: any[] = [];
  constructor(private builder: FormBuilder, private service: ApiService, private toaster: ToastrService) {
    service.getUserList().subscribe(res => {
      this.data = res;
    })
  }
  setteWallet = this.builder.group({
    amount: this.builder.control(null, Validators.required),
    user_id: this.builder.control('0', Validators.required),
    pin: this.builder.control(null, Validators.required),
  })


  setteWalletMethod() {
   if(this.setteWallet.invalid){
    this.toaster.error('fill all details')
   }
   else{
    const amount:any=this.setteWallet.value.amount;
    if(amount <0){
      this.toaster.error('Amount should be greater then 0')
    }
    else{
      this.service.fundTransfer(this.setteWallet.value).subscribe({
        next: data => {
          this.setteWallet.reset()
          this.toaster.success('Fund Transfer succesfully');
        },
        error: err => {
          console.log('err', err)
        }
      })
    }
   }
  }
  
 

}



// this.service.fundTransfer(this.formInfo.value).subscribe({
//   next: data => {
//     this.formInfo.reset()
//     this.toastr.success('Fund Transfer succesfully');
//   },
//   error: err => {
//     console.log('err', err)
//   }
// })