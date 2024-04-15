import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-installmentslip',
  templateUrl: './installmentslip.component.html',
  styleUrl: './installmentslip.component.css'
})
export class InstallmentslipComponent {
  constructor(private route: ActivatedRoute, private service: ApiService, private toastr: ToastrService) { }
  loanData: any;
  installment:any;
  index:any;
  isPaid=false;
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const data = params['data'];
      this.processData(data);
      this.service.viewLoanByLoanId({ loanId: this.loanId, emiId: this.emiId }).subscribe({
        next: (data: any) => {
          this.loanData = data;
          const installments = data.installments;
          this.index = installments.findIndex((inst: any) => inst.installmentId === this.emiId);
          if (this.index !== -1) {
            this.installment = installments[this.index];
            this.isPaid=true;
           
          } else {
            this.toastr.error("Installment not found for EMI ID")
          }
        },
        error: (err: any) => {
          console.log(err)
          this.toastr.error(err.message.error || 'An error occurred');
        }
      });
    });
  }
  
  
  loanId: string = '';
  emiId: string = '';

  processData(data: string) {
    // Split the data string using '&' as delimiter
    const parts = data.split('&');

    parts.forEach(part => {
      const keyValue = part.split('=');
      const key = keyValue[0];
      const value = keyValue[1];
      if (key === 'loanid') {
        this.loanId = value;
      } else if (key === 'emiid') {
        this.emiId = value;
      }
    });
  }

}


