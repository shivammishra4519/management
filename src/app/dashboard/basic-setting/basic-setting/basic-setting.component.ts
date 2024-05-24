import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-basic-setting',
  templateUrl: './basic-setting.component.html',
  styleUrl: './basic-setting.component.css'
})
export class BasicSettingComponent {
smsArray:any
constructor(private service:ApiService){
  service.getSmsAll().subscribe({
    next:data=>{
this.smsArray=data;
    },
    error:err=>{
      // console.log(err)
    }
  })
}
}
