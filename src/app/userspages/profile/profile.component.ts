import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any;
  stateData:any;
  state:any;
  city:any;
  role:any;
  constructor(private service: ProfileService,private builder:FormBuilder,private toastr:ToastrService,private apiservice:ApiService,authService:AuthService) {
    this.role=authService.decodingRole()
    service.viewProfile().subscribe({
      next: data => {
        this.userData = data;
      }
    })
    apiservice.getState().subscribe({
      next: data => {
        this.stateData = data;
        this.state = data.map((obj: any) => obj.state);
      }
    });
  };

  passWordDetails=this.builder.group({
    oldPassword:this.builder.control('',Validators.required),
    newPassword:this.builder.control('',Validators.required),
    confirmPassword:this.builder.control('',Validators.required),
  })
  isProfile = true;
  ischangePass = false;
  ischangePin=false;
  isUpdateAddress=false;
  isAddBankAccount=false;

  passWordChange() {
    this.ischangePass = true;
    this.isProfile = false;
    this.ischangePin=false;
    this.isAddBankAccount=false;
    this.isUpdateAddress=false;
  }

  changePasswordMethod(){
    if(this.passWordDetails.invalid){
      this.toastr.error('Fill All details');
      return ;
    }
    if(this.passWordDetails.value.newPassword !== this.passWordDetails.value.confirmPassword){
      this.toastr.error('New Password and Confirm Password must be same');
      return;
    }
    
   this.service.changePassword(this.passWordDetails.value).subscribe({
    next:data=>{
      this.toastr.success('Password Changed Successfully');
      this.passWordDetails.reset();
    },error:err=>{
      // console.log(err);
      this.toastr.error(err.error.message)
    }
   })
  }

  pinChange(){
    this.ischangePass = false;
    this.isProfile = false;
    this.ischangePin=true
    this.isUpdateAddress=false;
    this.isAddBankAccount=false;
  }
  pinDetails=this.builder.group({
    oldPin:this.builder.control('',Validators.required),
    newPin:this.builder.control('',Validators.required),
    confirmPin:this.builder.control('',Validators.required),
  })

  changePindMethod(){
    if(this.pinDetails.invalid){
      this.toastr.error('Fill All details');
      return ;
    }
    if(this.pinDetails.value.newPin !== this.pinDetails.value.confirmPin){
      this.toastr.error('New PIN and Confirm PIN must be same');
      return;
    }
    
   this.service.changePin(this.pinDetails.value).subscribe({
    next:data=>{
      this.toastr.success('PIN Changed Successfully');
      this.pinDetails.reset();
    },error:err=>{
      // console.log(err);
      this.toastr.error(err.error.message)
    }
   })
  }


  updateAddress(){
    this.ischangePass = false;
    this.isProfile = false;
    this.ischangePin=false
    this.isUpdateAddress=true;
    this.isAddBankAccount=false;
  }


  onStateSelect(event: Event) {
    const state = (event.target as HTMLSelectElement).value;
    if (state == '1') {
      this.toastr.warning('Select A Valid State')
    }
    else {
      this.city = this.stateData
        .filter((item: any) => item.state === state) // Filter items with the specified state
        .flatMap((item: any) => item.cities); // Extract cities from the filtered items
    }
  }
  onCitySelect(event: Event) {
    const state = (event.target as HTMLSelectElement).value;
    if (state == '1') {
      this.toastr.warning('Select A Valid State')
    }
  }


  addressForm=this.builder.group({
    localAddress:this.builder.control('',Validators.required),
    state:this.builder.control('1',Validators.required),
    district:this.builder.control('1',Validators.required),
    zipCode:this.builder.control('',Validators.required),
  })

  updateAddressDetails(){
    if(this.addressForm.invalid){
      this.toastr.error('fill all details')
    }else{
      this.service.updateAddress(this.addressForm.value).subscribe({
        next:data=>{
          this.toastr.success('Address Updated Successfully');
          this.addressForm.reset();
        },error:err=>{
          // console.log(err);
          this.toastr.error(err.error.message)
        }
      })
    }
  }

  updateBankAccount(){
    this.ischangePass = false;
    this.isProfile = false;
    this.ischangePin=false
    this.isUpdateAddress=false;
    this.isAddBankAccount=true;
  }
 
}
