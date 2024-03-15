import { Component } from '@angular/core';
import { DatasharingService } from '../../../services/datasharing.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-pay-emi',
  templateUrl: './pay-emi.component.html',
  styleUrl: './pay-emi.component.css'
})
export class PayEmiComponent {
  emidetails: any;
  installmentId: any;
  isOnline = false;

  amount: any
  constructor(private dataService: DatasharingService, private builder: FormBuilder, private service: ApiService) { }
  ngOnInit(): void {
    this.dataService.getCustomerData().subscribe(data => {
      this.emidetails = data.otherDetails;
      this.installmentId = data.installmentId;
      data.amount
      this.paymentForm.patchValue({
        user_id: this.emidetails.user_id,
        loan_Id: this.emidetails.loan_Id,
        installmentId: this.installmentId,
        pin: null,
        utr: null,
        paymentBy: null,
        paymentMod: '0',
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
    console.log('formvalue', this.paymentForm.value)
    console.log('js', this.emidetails)
  }

  payNow() {
    this.service.payEmi(this.paymentForm.value).subscribe((res) => {
      console.log('response from backend', res)
    })
  }

}
