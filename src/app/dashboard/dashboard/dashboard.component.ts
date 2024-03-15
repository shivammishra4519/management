import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  walletBalance:any;
constructor(private service:ApiService){
service.checkBalance().subscribe({
  next:data=>{
this.walletBalance=data.amount;

  }
})
}
}
