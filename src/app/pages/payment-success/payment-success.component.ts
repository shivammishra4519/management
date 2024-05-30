import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit, OnDestroy {
  decodedData: any;
  data: any;
  private subscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private service: ApiService) { }
  num = 1;
  ngOnInit(): void {


    this.subscription = this.route.queryParams.subscribe(params => {
    

      if (params['data']) {
     
        this.decodedData = params;
        const decodedString = atob(this.decodedData.data);
        this.data = JSON.parse(decodedString);
      
        this.callapi();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
     
    }
  }

  callapi(): void {

    this.service.verifyOnlinePayment(this.data).subscribe(res => {
      console.log("API Response: ", res);
    }, error => {
      console.error("API Error: ", error);
    });
  }
}
