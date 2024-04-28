import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settle-amount',
  templateUrl: './settle-amount.component.html',
  styleUrl: './settle-amount.component.css'
})
export class SettleAmountComponent {
  data: any[] = [];

  constructor(private router: Router, private builder: FormBuilder, private service: ApiService, private toaster: ToastrService) {
    service.findadminId().subscribe(res => {
      console.log(res);
      const number = res.number
      const str = number.toString();
      this.setteWallet.patchValue({
        user_id: str
      })
    })
    service.getUserList().subscribe(res => {
      this.data = res;
    })
    // this.userSetting()
  }
  isToadmin = true;
  isToEmployee = false;
  isToBank = false;
  toEmployee() {
    this.isToadmin = false;
    this.isToEmployee = true;
    this.isToBank = false;
    this.router.navigate(['/dashboard/settle-amount/employee']);
  }

  toBank() {
    this.isToadmin = false;
    this.isToEmployee = false;
    this.isToBank = true;
    this.router.navigate(['/dashboard/settle-amount/bank'])
  };

  toADmin() {
    this.isToadmin = true;
    this.isToEmployee = false;
    this.isToBank = false;
    this.router.navigate(['/dashboard/settle-amount/admin'])
  };




  setteWallet = this.builder.group({
    amount: this.builder.control(null, Validators.required),
    user_id: this.builder.control('0', Validators.required),
    pin: this.builder.control(null, Validators.required),
  })
  setteWalletMethod() {
    if (this.setteWallet.invalid) {
      this.toaster.error('fill all details')
    }
    else {
      const amount: any = this.setteWallet.value.amount;
      if (amount < 0) {
        this.toaster.error('Amount should be greater then 0')
      }
      else {
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

  setteWalletEmp = this.builder.group({
    amount: this.builder.control(null, Validators.required),
    user_id: this.builder.control('0', Validators.required),
    pin: this.builder.control(null, Validators.required),
  })


  setteWalletMethodToemployee() {
   if(this.setteWalletEmp.invalid){
    this.toaster.error('fill all details')
   }
   else{
    const amount:any=this.setteWalletEmp.value.amount;
    if(amount <0){
      this.toaster.error('Amount should be greater then 0')
    }
    else{
      this.service.fundTransfer(this.setteWalletEmp.value).subscribe({
        next: data => {
          this.setteWalletEmp.reset()
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



