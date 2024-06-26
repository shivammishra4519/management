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
  installment: any;
  index: any;
  isPaid = false;

  loanId: string = '';
  emiId: string = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loanId = params['loanid'];
      this.emiId = params['emiId'];



      this.service.viewLoanByLoanId({ loanId: this.loanId, emiId: this.emiId }).subscribe({
        next: (data: any) => {
         
          this.loanData = data;
          const installments = data.installments;
          this.index = installments.findIndex((inst: any) => inst.installmentId === this.emiId);
          this.calulateTotalAmount();
          if (this.index !== -1) {
            this.installment = installments[this.index];
            this.isPaid = true;
          } else {
            this.toastr.error("Installment not found for EMI ID")
          }
        },
        error: (err: any) => {
          // console.log("err1",err)
          // this.toastr.error(err.error.message );
        }
      });
    });
  }


totalAmount:any;
  calulateTotalAmount(){
   
    if(this.emiId == 'EMI0'){
      this.totalAmount=this.loanData.financeAmount;
    }
    if(this.emiId == 'EMI1'){
      this.totalAmount=this.loanData.financeAmount-this.loanData.emiAmount;
    }
    if(this.emiId == 'EMI2'){
      this.totalAmount=this.loanData.financeAmount-((this.loanData.emiAmount)*2);
    }
    if(this.emiId == 'EMI3'){
      this.totalAmount=this.loanData.financeAmount-((this.loanData.emiAmount)*3);
    }
    if(this.emiId == 'EMI4'){
      this.totalAmount=this.loanData.financeAmount-((this.loanData.emiAmount)*4);
    }
  
    
  }



}


