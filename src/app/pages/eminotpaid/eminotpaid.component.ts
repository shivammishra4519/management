import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eminotpaid',
  templateUrl: './eminotpaid.component.html',
  styleUrl: './eminotpaid.component.css'
})
export class EminotpaidComponent {
  sellDevices:any;
constructor(private service:ApiService, private dataService: DatasharingService, private router: Router,){
  service.unpaidEmi().subscribe(res=>{
    this.sellDevices=res;
    console.log(this.sellDevices);

  })
}


exportData() {
  this.service.exportUnpaidInExcel().subscribe(
    (response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'unpaidemi.xlsx'; // Provide the desired file name with .xlsx extension
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    error => {
      console.error('Error downloading Excel:', error);
      // Handle error (e.g., display error message to user)
    }
  );
}

viewEmis(data: any) {
  this.dataService.setCustomerData(data);
  this.router.navigate(['/dashboard/view-emi']);
}
}
