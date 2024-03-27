import { Component } from '@angular/core';
import { ViewdetailsService } from '../../../services/viewdetails.service';

@Component({
  selector: 'app-device-setting',
  templateUrl: './device-setting.component.html',
  styleUrl: './device-setting.component.css'
})
export class DeviceSettingComponent {
  brandName:any;

constructor(private service:ViewdetailsService){}

  saveBrand(){
const brand=this.brandName.toUpperCase();
this.service.addBrand({brand}).subscribe({
  next:data=>{
    this.brandName='';

  },
  error:err=>{
    console.log(err)
  }
})
  }
}
