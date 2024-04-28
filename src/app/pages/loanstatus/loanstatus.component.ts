import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-loanstatus',
  templateUrl: './loanstatus.component.html',
  styleUrl: './loanstatus.component.css'
})
export class LoanstatusComponent {
  data:any
constructor(private service:ApiService){
  service.viewAlldevice().subscribe(res=>{
  this.data=res
  
})
}

exportData() {
  this.service.exportLoanInExcel().subscribe(
    (response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'loan-data.xlsx'; // Provide the desired file name with .xlsx extension
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


}
