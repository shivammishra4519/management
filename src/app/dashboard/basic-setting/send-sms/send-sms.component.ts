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

const data={
  "api_key": "36138A813805F9",
  "campaign": "13393",
  "routeid": "30",
  "type": "text",
  "contacts": "9198113388",
  "from": "OMTRDE",
  "msg": "Your New Password is 84350332 Thank you for business with us Regards Om Traders",
  "template_id": "1207170920832124039",
  "pe_id": "1201163058752081861"
}
this.service.submitToServer(data)

}



}
