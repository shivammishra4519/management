import { Component } from '@angular/core';
import { DatasharingService } from '../../../services/datasharing.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pay-emi',
  templateUrl: './pay-emi.component.html',
  styleUrl: './pay-emi.component.css'
})
export class PayEmiComponent {
  emidetails: any;
  installmentId: any;
  isOnline = false;
  currentCredit: any;
  amount: any
  empName: any
  constructor(private dataService: DatasharingService, private builder: FormBuilder, private service: ApiService, private toster: ToastrService, private authService: AuthService) {
    this.empName = authService.name
  }

  ngOnInit(): void {
    this.dataService.getCustomerData().subscribe(data => {
      console.log(data)
      this.currentCredit = data.otherDetails.currentCredit
      this.emidetails = data.otherDetails;
      this.installmentId = data.installmentId;

      this.amount = data.amount
      this.paymentForm.patchValue({
        user_id: this.emidetails.customerNumber,
        loan_Id: this.emidetails.loanId,
        installmentId: this.installmentId,
        pin: null,
        utr: null,
        paymentBy: null,
        paymentMod: '0',
        // amount: this.emidetails.installments[0].amount
        amount: this.emidetails.installments[0].amount
      });
    });
  }


  paymentForm = this.builder.group({
    user_id: this.builder.control('', Validators.required),
    loan_Id: this.builder.control('', Validators.required),
    installmentId: this.builder.control('', Validators.required),
    pin: this.builder.control('', Validators.required),
    utr: this.builder.control('', Validators.required),
    paymentBy: this.builder.control('', Validators.required),
    paymentMod: this.builder.control('0', Validators.required),
    amount: this.builder.control('', Validators.required)
  })

  paymentMethod(event: any) {
    event = (event.target as HTMLSelectElement).value
    if (event == 'cash') {
      this.isOnline = false;
    } else if (event == 'online') {
      this.isOnline = true;
    } else {
      this.isOnline = false;
    }

  }

  payNow() {
    this.service.payEmi(this.paymentForm.value).subscribe({
      next: data => {
        this.toster.success('Emi Paid Succesfully');
        this.paymentForm.reset()
        this.sendSms()
      },
      error: err => {
        console.log(err);
      }
    })
  
  }


  sendSms() {

    let template: any
    let api: any;
    this.service.viewTemplateSms({ type: 'EMI_PAID' }).subscribe({
      next: data => {
        template = data.template;
        api = data.api;
        const values = [this.amount, this.empName, this.currentCredit]
        const result = this.replacePlaceholders(template, values);
        this.service.sendsmsbyapi({
          type: "Whatsapp",
          number: this.emidetails.customerNumber,
          sms: result
        }).subscribe(res=>{
          
        })
      }
    })
  }


  replacePlaceholders(template: string, values: any[]): string {
    let index = 0;
    return template.replace(/{#var#}/g, () => {
      return values[index++];
    });
  }



  // const urlTemplate = "http://62.72.56.135:4000/getmesaage?phoneNumber=mmmm&message=tttt";
  // const phoneNumber = "1234567890";
  // const message = "Hello, this is a test message";

  // const finalUrl = replaceUrlPlaceholders(urlTemplate, phoneNumber, message);
  // console.log(finalUrl);


}
