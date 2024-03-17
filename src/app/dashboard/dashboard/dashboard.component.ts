import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  walletBalance:any;
constructor(private service:ApiService,private auth:AuthService){
service.checkBalance().subscribe({
  next:data=>{
this.walletBalance=data.amount;

  }
})
auth.decodingRole()
}


checkAmount(){
  this.service.checkBalance().subscribe({
    next:data=>{
  this.walletBalance=data.amount;
  
    }
  })
}



}
