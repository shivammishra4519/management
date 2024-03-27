import { Component } from '@angular/core';
import { ViewdetailsService } from '../../services/viewdetails.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  customer:any;
  devices:any;
  soldDevices:any;
  shops:any
  role:any;
  employeeList:any;

constructor(private serive:ViewdetailsService,private authService:AuthService){
  this.customerDetails()
  this.deviceDetails()
  this.viewSoldDevice()
 
  this.role=authService.decodingRole();
  this.viewShops();
  this.viewEmploye();
  
}



customerDetails(){
this.serive.viewCustomer().subscribe({
  next:data=>{
    this.customer=data.totalCustomers;
  }
})
}

deviceDetails(){
  this.serive.viewDevices().subscribe({
    next:data=>{
      this.devices=data.response;
    },
    error:err=>{
      console.log(err)
    }
  })
}

viewSoldDevice(){
  this.serive.viewSoldDevice().subscribe({
    next:data=>{
this.soldDevices=data.response;
    }
  })
}


viewShops(){
this.serive.viewShops().subscribe({
  next:data=>{
    this.shops=data.totalShops;
  }
})
}

viewEmploye(){
this.serive.viewEmployee().subscribe({
  next:data=>{
    this.employeeList=data.totalEmployees;
  }
})
}

}
