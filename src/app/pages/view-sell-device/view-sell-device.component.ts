import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

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

  constructor(private service: ApiService) {
    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
    service.viewSellDevicesList().subscribe({
      next: (data: any[]) => {
        this.dataFromDB = data;
        this.filteredData = data; // Assign data to filteredData
      }
    });
  }




  

  filterData() {
    // Check if all necessary data is available
    if (this.dataFromDB) {
      // Filter the data based on the customer number
      this.filteredData = this.dataFromDB.filter((item: any) => {
        return this.customerNumber ? item.customerNumber === this.customerNumber : true;
      });
    }
  }
  
  
  
}
