import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatasharingService } from '../../services/datasharing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-customers-list',
  templateUrl: './view-customers-list.component.html',
  styleUrl: './view-customers-list.component.css'
})
export class ViewCustomersListComponent {

  constructor(private service: ApiService,private dataService: DatasharingService,private router:Router) { 
    this.service.customerListView().subscribe(
      (res: any[]) => {
        // Assuming the API response is an array of objects
        this.dataSource.data = res; // Update dataSource with API response data
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  displayedColumns: string[] = ['firstName', 'lastName', 'adharCardNumber', 'number', 'Active', 'Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;




  viewProfile(data: any) {
    this.dataService.setCustomerData(data.element);
    this.router.navigate(['/dashboard/view-customers']);
  }

  

}
