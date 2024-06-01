import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fund-transefer-detaills',
  templateUrl: './fund-transefer-detaills.component.html',
  styleUrl: './fund-transefer-detaills.component.css'
})
export class FundTranseferDetaillsComponent {
  transectioData:any[]=[]
  transectioData1:any[]=[]
number:any;
role:any;
  constructor(private service:ApiService,private auth:AuthService){
    service.getFundDetails().subscribe({
      next:data=>{
        this.transectioData=data.filterData;
        this.transectioData1=data.filterData1;
        console.log(this.transectioData)
      },
      error:err=>{
        console.log(err)
      }
    })
    this.number=auth.userId;
    this.role= this.auth.decodingRole();
  }
 

}
