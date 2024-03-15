import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-fund-transefer-detaills',
  templateUrl: './fund-transefer-detaills.component.html',
  styleUrl: './fund-transefer-detaills.component.css'
})
export class FundTranseferDetaillsComponent {
  transectioData:any[]=[]

  constructor(private service:ApiService){
    service.getFundDetails().subscribe({
      next:data=>{
        this.transectioData=data;
        console.log(this.transectioData)
      },
      error:err=>{
        console.log(err)
      }
    })
  }
}
