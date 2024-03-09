import { Component } from '@angular/core';
import { DatasharingService } from '../../services/datasharing.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent {

  customerData: any;
  customerInfo:any;

  imageUrl:any
  constructor(private dataService: DatasharingService,private service:ApiService) { 
    
  }

  ngOnInit() {
    this.dataService.getCustomerData().subscribe(data => {
      this.customerData = data;
      this.service.viewProfile(this.customerData).subscribe({
        next:(res:any)=>{
          this.customerInfo=res;
         this.service.imageView(this.customerInfo.images.profilePictures).subscribe(res=>{
          console.log('res',res)
          this.imageUrl=res;
          console.log('')
         })
        },
        error:err=>{
          console.log(err)
        }
      })
    });
  }

}
