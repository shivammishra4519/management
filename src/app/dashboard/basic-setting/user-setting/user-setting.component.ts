import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatasharingService } from '../../../services/datasharing.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css'
})
export class UserSettingComponent {
constructor(private router:Router,private dataSharing:DatasharingService){}
isUserSetting=true;
isBasic=false
isManageDevices=false;
isAddDevice=false;
isStockDevice=false;
isHomeAppliance=false;
isHomeApplianceView=false;

userSetting(){
this.isBasic=false;
this.isUserSetting=true;
}
basicSetting(){
  this.isBasic=true;
  this.isUserSetting=false;
}
addBrand(){
  this.isManageDevices=true;
  this.isAddDevice=false
  this.isStockDevice=false
  this.isHomeAppliance=false;
  this.isHomeApplianceView=false;
}
addDevice(){
  this.isManageDevices=false;
  this.isAddDevice=true
  this.isStockDevice=false
  this.isHomeAppliance=false;
  this.isHomeApplianceView=false;
}

viewDevice(){
  this.isManageDevices=false;
  this.isAddDevice=false
  this.isStockDevice=true
  this.isHomeAppliance=false;
  this.isHomeApplianceView=false;
}

homeAppliance(){
  this.isManageDevices=false;
  this.isAddDevice=false
  this.isStockDevice=false;
  this.isHomeAppliance=true;
  this.isHomeApplianceView=false;
}

homeApplianceView(){
  this.isManageDevices=false;
  this.isAddDevice=false
  this.isStockDevice=false;
  this.isHomeAppliance=false;
  this.isHomeApplianceView=true;
}

 


}
