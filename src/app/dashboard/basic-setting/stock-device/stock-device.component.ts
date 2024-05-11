import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-stock-device',
  templateUrl: './stock-device.component.html',
  styleUrl: './stock-device.component.css'
})
export class StockDeviceComponent {
  devices:any;
constructor(private service:ApiService,private toastr:ToastrService,private builder:FormBuilder){
  service.viewAllDevice().subscribe({
    next:data=>{
      this.devices=data;
      
    },
    error:err=>{
      console.log(err)
    }
  })
}
isEdita=false;
editDevice=this.builder.group({
  brand:this.builder.control('0',Validators.required),
  model:this.builder.control('',Validators.required),
  dpPrice:this.builder.control(null,Validators.required),
  margin:this.builder.control(null,Validators.required),
  interest:this.builder.control(null,Validators.required),
  fileCharge:this.builder.control(null,Validators.required),
  downPayment:this.builder.control(null,Validators.required),
  _id:this.builder.control(null,Validators.required),
   })
  
deleteMethod(data:any){
  if (confirm('Are you sure you want to delete this device?')) {
    this.service.deleteDevice(data).subscribe({
      next:data=>{
        console.log(data)
        this.service.viewAllDevice().subscribe({
          next:data=>{
            this.devices=data;
            
          },
          error:err=>{
            console.log(err)
          }
        })
        this.toastr.success('Device deleted successfully');
      },error:err=>{
        this.toastr.error(err.error.message)
        console.log(err)
      }
    })
   
  }
}

editMethod(device: any) {
this.isEdita=true;
this.editDevice.patchValue({
  brand:device.brand,
  model:device.model,
  dpPrice:device.dpPrice,
  margin:device.margin,
  interest:device.interest,
  fileCharge:device.fileCharge,
  downPayment:device.downPayment,
  _id:device._id
})
     
}

edit(){
this.service.upadteDevice(this.editDevice.value).subscribe(res=>{
  this.toastr.success('Updated Successfully')
  this.service.viewAllDevice().subscribe({
    next:data=>{
      this.devices=data;
     
      this.isEdita=false
    },
    error:err=>{
      this.toastr.error(err.error.message)
    }
  })
})
}

}
