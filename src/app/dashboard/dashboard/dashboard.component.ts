import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { DatasharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  walletBalance:any;
constructor(private service:ApiService,private auth:AuthService,public dataSharing:DatasharingService){
// service.checkBalance().subscribe({
//   next:data=>{
// this.walletBalance=data.amount;

//   }
// })
  this.checkAmount();
auth.decodingRole()
}


checkAmount(){
  this.service.checkBalance().subscribe({
    next:data=>{
  this.walletBalance=data.amount;
  this.dataSharing.wallet=data.amount;
  
    }
  })
}



}
