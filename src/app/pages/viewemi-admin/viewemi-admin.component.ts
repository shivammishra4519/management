import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-viewemi-admin',
  templateUrl: './viewemi-admin.component.html',
  styleUrl: './viewemi-admin.component.css'
})
export class ViewemiAdminComponent {
  data:any
  constructor(private service:ApiService) { 
   
    service.viewPaidEmiAdmin().subscribe(res=>{
     this.data=res
    })
  }
}
