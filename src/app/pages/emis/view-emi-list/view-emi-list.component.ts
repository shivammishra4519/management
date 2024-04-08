import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-view-emi-list',
  templateUrl: './view-emi-list.component.html',
  styleUrl: './view-emi-list.component.css'
})
export class ViewEmiListComponent {

  emiData:any;
constructor(private service:ApiService){
  service.viewPaidEmi().subscribe({
    next:data=>{
      this.emiData=data;
    },
    error:err=>{
      alert('somtheing went wrong')
      console.log(err)
    }
  })
}
}
