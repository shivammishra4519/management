import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paytm-gatway',
  templateUrl: './paytm-gatway.component.html',
  styleUrl: './paytm-gatway.component.css'
})
export class PaytmGatwayComponent {
  constructor(private http: HttpClient) {}

  initiatePayment() {
    this.http.post<any>('http://localhost:3000/api/initiatePayment', {})
      .subscribe(
        response => {
          // console.log('Payment initiation response:', response);
          // this.redirectToPaytm(response);
        },
        error => {
          console.error('Error initiating payment:', error);
        }
      );
  }

  redirectToPaytm(params: any) {
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'https://securegw-stage.paytm.in/theia/processTransaction'; // Use staging URL for testing

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }
}
