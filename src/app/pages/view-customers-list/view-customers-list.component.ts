import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-customers-list',
  templateUrl: './view-customers-list.component.html',
  styleUrl: './view-customers-list.component.css'
})
export class ViewCustomersListComponent {
customerData:any;
  constructor(private service: ApiService,private dataService: DatasharingService,private router:Router) { 
    service.customerListView().subscribe({
      next:(data:any[])=>{
        this.customerData=data;
      }
    })
  }


  viewProfile(data: any) {
    this.dataService.setCustomerData(data);
    this.router.navigate(['/dashboard/view-customers']);
  }
  viewEmis(data:any){
    this.dataService.setCustomerData(data);
    this.router.navigate(['/dashboard/view-emi']);
  }
  

}
