import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrl: './download-pdf.component.css'
})
export class DownloadPdfComponent {
  customerArray: any;
  constructor(private service: ApiService, private toaster: ToastrService) {
    service.customerListView().subscribe({
      next: data => {
        this.customerArray = data
      }
    })
  }

  loansArray: any;
  customerNumber: any;
  onSelectUser(event: Event) {
    this.customerNumber = null;
    this.loansArray = null;
    const user = parseInt((event.target as HTMLSelectElement).value);
    if (user == 0) {
      this.toaster.error('Select a Valid File');
      return
    } else {
      this.customerNumber = user;
      this.service.viewAllDeviceByLoanId({ number: user }).subscribe({
        next: data => {
          this.loansArray = data;
        }
      })
    }


  }
  currentLoan: any;
  shopid: any;
  onSelectLoan(event: Event) {
    this.currentLoan = null;
    const loanId = (event.target as HTMLSelectElement).value; // Assuming the value is the loanId

    if (loanId == "0") {
      this.toaster.error('Select a Valid File')
    } else {
      this.currentLoan = this.filterLoanById(loanId);
      if (this.currentLoan.length > 0) {
        const shopName = this.currentLoan[0].shop;
        this.service.findShopIdByName({ shop: shopName }).subscribe(res => {
          this.shopid = res; // Assuming you want to store the shop ID in this.shopid
        });
      }
    }


  }


  filterLoanById(loanId: string) {
    return this.loansArray.filter((loan: any) => loan.loanId === loanId);
  }


  downloadTermsCondition(): void {
    const number = this.customerNumber;
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
    const obj = {
      loanId: this.currentLoan.loanId,
      shopId: this.shopid,
      customerId: this.customerNumber
    }
    this.service.downloadAggrement(obj).subscribe(response => {

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
  //     window.URL.revokeObjectURL(url);
  //   }, error => {
  //     this.toaster.error('Error downloading PDF:', error)
  //   });
  // }

  downloadGaurntorAgreement(): void {
    const number = this.currentLoan.guarntor;
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
  currentType: any;
  onSelectOfpdf(event: Event) {
    this.currentType = null;
    const type = (event.target as HTMLSelectElement).value;

    if (type == "0") {
      this.toaster.error('Select a Valid File')
    } else {
      this.currentType = type;
    }
  }


  

  downloadInvoiceForCompany(): void {
    const number = this.currentLoan.guarntor;
    this.service.downloadInvoiceForCompany({ loanId: this.currentLoan.loanId }).subscribe(response => {

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
      this.toaster.error('Error downloading PDF:', error)
    });
  }

  downloadPdf() {
    if (!this.customerNumber) {
      this.toaster.error('Select a User');
      return;
    }
    if (!this.currentLoan) {
      this.toaster.error("Select a Loan");
      return
    }
    if (!this.currentType) {
      this.toaster.error('Select a valid file');
      return
    }
    if(this.currentType == '1'){
      this.downloadTermsCondition();
      return;
    }
    if(this.currentType == '2'){
      this.downloadAggrement();
      return;
    }
    if(this.currentType == '3'){
      this.downloadGaurntorAgreement();
      return;
    }
    if(this.currentType == '5'){
      this.downloadInvoiceForCompany();
      return;
    }
  }

}
