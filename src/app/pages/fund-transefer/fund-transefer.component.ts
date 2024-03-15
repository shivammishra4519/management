import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fund-transefer',
  templateUrl: './fund-transefer.component.html',
  styleUrl: './fund-transefer.component.css'
})
export class FundTranseferComponent {
  data: any[] = []
  constructor(private service: ApiService,private builder:FormBuilder) {
    service.getUserList().subscribe(res => {
      this.data = res;
    })
  }

fromInfo=this.builder.group({
  user_id:this.builder.control('0',Validators.required),
  amount:this.builder.control('',Validators.required),
  pin:this.builder.control('',Validators.required)
})

fundTransfer(){
  if(this.fromInfo.invalid){
    alert('fill all details')
  }else{
    this.service.fundTransfer(this.fromInfo.value).subscribe({
      next:data=>{
        this.fromInfo.reset()
        alert('fund transfer successfully');
      },
      error:err=>{
        console.log('err',err)
      }
    })
  }
}

}
