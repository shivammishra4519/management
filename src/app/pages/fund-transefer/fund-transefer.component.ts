import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatasharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-fund-transefer',
  templateUrl: './fund-transefer.component.html',
  styleUrl: './fund-transefer.component.css'
})
export class FundTranseferComponent {
  data: any[] = []
  isTransfer=true;
  isRecive=false;
  fundData:any;
  fundReciveData:any;
  constructor(private service: ApiService, private builder: FormBuilder,private toastr: ToastrService,private dataSharing:DatasharingService) {
    service.getUserList().subscribe(res => {
      this.data = res;
    
    })
    service.fundHistoryByAdmin().subscribe(res=>{
      this.fundData=res;
    })
    this.fundRecive();
  }

  formInfo = this.builder.group({
    user_id: this.builder.control('0', Validators.required),
    amount: this.builder.control('', Validators.required),
    pin: this.builder.control('', Validators.required)
  })

  fundTransfer() {
    if (this.formInfo.invalid) {
      return alert('fill all details')
    }
      const amount: any = this.formInfo.value.amount;
      const intAmount = parseInt(amount);

      if (intAmount <= 0) {
        return alert('amount can not be smaller then 1')
      }
      else {
        this.service.fundTransfer(this.formInfo.value).subscribe({
          next: data => {
            this.formInfo.reset()
            this.toastr.success('Fund Transfer succesfully');
            this.service.fundHistoryByAdmin().subscribe(res=>{
              this.fundData=res;
            })
            this.dataSharing.checkWallence();
          },
          error: err => {
            console.log('err', err)
          }
        })
      }
    }


    fundTransferNav(){
this.isTransfer=true;
this.isRecive=false;
    }
    fundReciveNav(){
      this.isTransfer=false;
      this.isRecive=true;
    }

    fundRecive(){
      this.service.fundReciveByAdmin().subscribe(res=>{
        this.fundReciveData=res
        console.log(res)
      })
    }

  }
