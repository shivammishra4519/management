import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-appliances',
  templateUrl: './home-appliances.component.html',
  styleUrl: './home-appliances.component.css'
})
export class HomeAppliancesComponent {
  Brand:any=[]
  constructor(private builder: FormBuilder, private service:ApiService,private toaster:ToastrService) {
  service.getAllBrands().subscribe({
    next:data=>{
      this.Brand=data;
      console.log('data',data)
    },
    error:err=>{
      console.log(err)
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
    this.service.saveDevicesInfo(this.addDevice.value).subscribe({
      next: res => {
        this.addDevice.reset();
       this.toaster.success('Device Added Succesfully')
      },
      error: error => {
        console.error(error);
        this.toaster.error(error.error.message)
      }
    });
  }
}
}
