import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewdetailsService } from '../../services/viewdetails.service';

@Component({
  selector: 'app-settle-collection',
  templateUrl: './settle-collection.component.html',
  styleUrl: './settle-collection.component.css'
})
export class SettleCollectionComponent {
  employeeArray: any;
  isAmount = false;
  amount: any;
  transactions:any;
  users:any;
  constructor(private service: ApiService, private builder: FormBuilder, private toaster: ToastrService, private viewDetails: ViewdetailsService) {
    service.getEmployeeList().subscribe({
      next: data => {
        this.employeeArray = data;

      }
    })
    service.findAllcSettleCollection().subscribe(res=>{
 
      this.transactions=res;
    })
    service.findAllCollectionWallet().subscribe(res=>{
      this.users=res;
    })
  }

  settleCollection = this.builder.group({
    user_id: this.builder.control('0', Validators.required),
    amount: this.builder.control('', Validators.required),
    pin: this.builder.control('', Validators.required)
  })
  onEmployeeSelect(event: Event) {
    const employee = (event.target as HTMLSelectElement).value;
    if (employee == '0') {
      this.toaster.error('Select a Valid Employee');
      return;
    }
    const num = parseInt(employee);
    this.viewDetails.getDailyCollection({ number: num }).subscribe({
      next: data => {
        this.amount = data.amount;
        this.isAmount = true;
        // console.log(data)
      }
    })

  }

  settleCollectionMethod() {
    const amount: any = this.settleCollection.value.amount;
    if (amount <= 0) {
      this.toaster.error('Amount should be greater then 0');
      return
    }
    if (amount > this.amount) {
      this.toaster.error('Amount can not be greater then Current Amount');
      // console.log(this.amount)
      return
    }
    this.service.settleCollection(this.settleCollection.value).subscribe(res => {
      this.toaster.success('Amount settled Successfully');
      this.settleCollection.reset();
    })
  }

}
