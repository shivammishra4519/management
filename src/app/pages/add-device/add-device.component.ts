import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ViewdetailsService } from '../../services/viewdetails.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css'
})
export class AddDeviceComponent {
  Brand:[]=[]
  constructor(private builder: FormBuilder, private service:ApiService,private viewdetails:ViewdetailsService) {
    viewdetails.viewBrand().subscribe({
      next:data=>{
        this.Brand=data.brand;

      }
    })
   }

 addDevice=this.builder.group({
brand:this.builder.control('0',Validators.required),
model:this.builder.control('',Validators.required),
dpPrice:this.builder.control(null,Validators.required),
margin:this.builder.control(null,Validators.required),
interest:this.builder.control(null,Validators.required),
fileCharge:this.builder.control(null,Validators.required),
downPayment:this.builder.control(null,Validators.required),
 })



submit(): void {
  if (this.addDevice.invalid) {
    alert('Please fill all details');
  } else {
    this.service.addDevice(this.addDevice.value).subscribe({
      next: res => {
        this.addDevice.reset();
        alert('Device added');
      },
      error: error => {
        console.error(error);
        alert('An error occurred while adding the device');
      }
    });
  }
}
}
