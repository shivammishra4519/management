import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
constructor(private route: ActivatedRoute){
  this.route.queryParams.subscribe(params => {
    console.log(params)
  });
}
}
