import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-sell-device',
  templateUrl: './view-sell-device.component.html',
  styleUrls: ['./view-sell-device.component.css']
})
export class ViewSellDeviceComponent {
  filteredData: any[] = [];
  fromDate: string;
  toDate: string;
  customerNumber: any = null;
  dataFromDB: any;

  constructor(private service: ApiService, private dataService: DatasharingService, private router: Router, private builder: FormBuilder) {
    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
    service.viewSellDevicesList().subscribe({
      next: (data: any[]) => {
        this.dataFromDB = data;
      
        this.filteredData = data; // Assign data to filteredData
        // console.log(this.filterData)
      }
    });
  }

  filterForm = this.builder.group({
    from: this.builder.control(''),
    to: this.builder.control(''),
    number: this.builder.control(''),
  })





  filterData() {
    this.service.filterDataByDate(this.filterForm.value).subscribe(res=>{
      this.filteredData=res;
      // console.log(this.filterData)
    })
  }



  viewEmis(data: any) {
    this.dataService.setCustomerData(data);
    this.router.navigate(['/dashboard/view-emi']);
  }


}
