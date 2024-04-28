import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.css'
})
export class AgreementComponent {
  data:any;
  constructor(private route: ActivatedRoute, private service: ApiService,private toastr:ToastrService) {
    this.route.queryParams.subscribe(params => {
      service.findPlaceOfShopAndCustomer(params).subscribe(res=>{
        this.data=res;
      })
    })
   }
 



 
}
