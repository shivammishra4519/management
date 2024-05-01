import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-view-emi-list',
  templateUrl: './view-emi-list.component.html',
  styleUrl: './view-emi-list.component.css'
})
export class ViewEmiListComponent {

  transactionData:any;
  dataAvailable=false;
constructor(private service:ApiService){
 service.viewAllEmi().subscribe(res=>{
  this.transactionData=res;
 this.dataAvailable=true
 })
}
}
