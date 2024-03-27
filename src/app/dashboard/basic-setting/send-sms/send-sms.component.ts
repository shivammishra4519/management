import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrl: './send-sms.component.css'
})
export class SendSmsComponent {
constructor(private service:ApiService){}
template:any

sendSmsEv(){

// this.service.verifyOtp()

}



}
