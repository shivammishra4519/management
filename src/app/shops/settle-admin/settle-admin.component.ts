import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settle-admin',
  templateUrl: './settle-admin.component.html',
  styleUrl: './settle-admin.component.css'
})
export class SettleAdminComponent {
 
  constructor(private builder: FormBuilder, private service: ApiService, private toaster: ToastrService) {
  
  }
  setteWallet = this.builder.group({
    type: this.builder.control('', Validators.required),
    amount: this.builder.control(null, Validators.required),
    user_id: this.builder.control('0', Validators.required),
    pin: this.builder.control(null, Validators.required),
  })
  setteWalletMethod() {
   
  }
}
