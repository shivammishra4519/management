import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-applinces-success',
  templateUrl: './home-applinces-success.component.html',
  styleUrl: './home-applinces-success.component.css'
})
export class HomeApplincesSuccessComponent {
  data: any

  constructor(private service: ApiService, private toaster: ToastrService, private route: ActivatedRoute,) {
    route.queryParams.subscribe(parms => {
      this.data = parms
    })
  }

  // this.downloadAggrement(data);
  // this.downloadTermsCondition();
  // // this.downloadInvoice(data);
  // this.downloadGaurntorAgreement();

  downloadTermsCondition(): void {
    const number = this.data.number;
    this.service.downloadTermsCondition({ number: number }).subscribe(response => {

      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      a.download = 'termscondition.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      this.toaster.error('Error downloading PDF:', error)
    });
  }

  downloadAggrement(): void {
    const  obj = {
      loanId:this.data.loanId,
      shopId:this.data.shopId,
      customerId:this.data.number
    }
    this.service.downloadAggrementHomeApplinces(obj).subscribe(response => {

      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'aggrement.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      this.toaster.error('Error downloading PDF:', error)
    });
   
  }

  // downloadInvoice(data: any): void {

  //   this.service.downloadInvoice(data).subscribe(response => {

  //     const blob = new Blob([response], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'invoice.pdf';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);5
  //   }, error => {
  //     this.toaster.error('Error downloading PDF:', error)
  //   });
  // }

  downloadGaurntorAgreement(): void {
    const number = this.data.guarntor;
    this.service.downloadGaurntorAgreement({ number: number }).subscribe(response => {

      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gaurntor-aggrement.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      this.toaster.error('Error downloading PDF:', error)
    });
  }

  downloadInvoiceForCompany(): void {
  
    this.service.downloadInvoiceForCompanyHomeAppliances({ loanId: this.data.loanId }).subscribe(response => {

      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice-company.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.log(error)
      this.toaster.error('Error downloading PDF:', error)
    });
  }
}
