import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-guarantor-view',
  templateUrl: './guarantor-view.component.html',
  styleUrl: './guarantor-view.component.css'
})
export class GuarantorViewComponent {
  users:any;
  constructor(private service:ApiService){
    service.viewGauarntorList().subscribe({
      next:data=>{
        this.users=data;
      }
    })
  }

}
