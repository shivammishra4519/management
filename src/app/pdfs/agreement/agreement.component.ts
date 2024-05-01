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
  data: any;
  isDataAvailable = false;
  constructor(private route: ActivatedRoute, private service: ApiService, private toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
     if(params){
      service.findPlaceOfShopAndCustomer(params).subscribe({
        next:data=>{
          this.data = data;
          console.log(data)
          this.isDataAvailable = true;
        },
        error:err=>{
          toastr.error('error')
        }
      })
     }
    })
  }





}
