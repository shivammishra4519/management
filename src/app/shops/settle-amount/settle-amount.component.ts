import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settle-amount',
  templateUrl: './settle-amount.component.html',
  styleUrl: './settle-amount.component.css'
})
export class SettleAmountComponent {
  constructor(private router:Router){}
  
  toBank(){
this.router.navigate(['/dashboard/bank'])
  }
  toEmployee(){
    this.router.navigate(['/dashboard/employee']);

  }
  toAdmin(){
    this.router.navigate(['/dashboard/admin'])
  }
}
