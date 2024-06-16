import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  loanDetails:any;
  shopDetails:any;
  invoice:any;
  cgst:any;
  sgst:any;
  calMrp:any;
  total:any;
  isDataAbailable=false;
  //  date=new Date();
  constructor(private service:ApiService,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.invoice=params['invoice']
      service.dataForInvoice(params).subscribe(res=>{
       this.loanDetails=res.result;
       this.shopDetails=res.result1;
      
       this.isDataAbailable=true
       this.calculatedCgst()
      })
    })
   
  }


  calculatedCgst(){
    const mrp=this.loanDetails.mrp;
   const mrp18=mrp / (1 + 0.18);
   const mrpFix=parseFloat(mrp18.toFixed(2));
    const cgstCal= (mrp -mrpFix)/2;
    this.cgst=parseFloat(cgstCal.toFixed(2));
    const sgstCal= (mrp -mrpFix)/2;
    this.sgst=parseFloat(sgstCal.toFixed(2));
    const mrpCal=mrp-this.cgst-this.sgst;
    this.calMrp=parseFloat(mrpCal.toFixed(2));
    this.total=this.calMrp+this.loanDetails.fileCharge+this.cgst+this.sgst;
  }
}
