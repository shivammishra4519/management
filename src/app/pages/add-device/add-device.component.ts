import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css'
})
export class AddDeviceComponent {
  constructor(private builder: FormBuilder, private service:ApiService) { }

  addDevice = {
    brand: '',
    model: '',
    dpPrice: 0,
    margin: 0,
    mrp: 0,
    interest:0,
    fileCharge:0,
    downPayment:0,
    totalAmount:0
  };
  
  submit() {
    this.addDevice.mrp = this.addDevice.dpPrice + (this.addDevice.dpPrice*this.addDevice.margin)/100;
  }

  total(){
    // this.addDevice.totalAmount=(this.addDevice.mrp+this.addDevice.intrest+this.addDevice.fileCharge)-this.addDevice.downPayment;
    this.addDevice.totalAmount=(this.addDevice.mrp+(this.addDevice.mrp)*(this.addDevice.interest)/100) +(this.addDevice.mrp)*(this.addDevice.fileCharge)/100;
  }
 
  addDetails(){
    this.service.addDevice(this.addDevice).subscribe({
      next:res=>{
        console.log(res);
  alert('device added')
      },
      error:error=>{
        console.log(error);
      }
    })
  }
  
  
}
