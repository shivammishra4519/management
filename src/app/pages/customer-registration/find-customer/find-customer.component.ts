import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-find-customer',
  templateUrl: './find-customer.component.html',
  styleUrl: './find-customer.component.css'
})
export class FindCustomerComponent {
  constructor(private serive: ApiService, private toastr: ToastrService) { }
  number: any;
  adharcardNumber: any;
  userData: any;
  byAadhar() {
    const str: any = this.adharcardNumber.toString();
    let lengt = 0;
    lengt = str.length; // Removed () from length
    if (lengt > 12 || lengt < 12) {
      this.toastr.error('Please enter a valid Aadhar number ')
    }
    else {
      const obj = {
        number: this.number,
        adharCardNumber: str
      }
      this.serive.filterCustomer(obj).subscribe({
        next: data => {
          this.userData = data;
        }, error: err => {
          this.toastr.error('user not find')
        }
      })
    }

  }

  byNumber() {
    const str: any = this.number.toString();
    let lengt = 0;
    lengt = str.length; // Removed () from length
    if (lengt > 10 || lengt < 10) {
      this.toastr.error('Please enter a valid Aadhar number ')
    }
    else {
      const obj = {
        number: this.number,
        adharCardNumber: null
      }
      this.serive.filterCustomer(obj).subscribe({
        next: data => {
          this.userData = data;
        }, error: err => {
          this.toastr.error('user not find')
        }
      })
    }
  }


  checkStatus(data:any){

  }
}
