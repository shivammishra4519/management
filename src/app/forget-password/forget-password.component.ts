import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  otpSection = false;
  otpInp = false;
  number: any
  otp:any
  confirmPassword:any;
  password:any;
  constructor(private service: ApiService,private router:Router) { }
  getOtp() {
    const stringNumber = this.number.toString();
    const numberLenght = stringNumber.length;
    if (numberLenght == 10) {
      this.service.checkUser({ number: this.number }).subscribe({
        next: data => {
          this.service.sendOtp({ number: this.number, type: 'OTP1' }).subscribe({
            next: data => {
              this.otpInp = true;
            },
            error: err => {
              console.log('error', err)
            }
          })
        }
      })
    }
  }
  verifyOtp() {
    const obj = {
      number: this.number,
      otp: this.otp
    }
    this.service.verifyeOtp(obj).subscribe({
      next: data => {
       this.otpSection=true;
      },
      error: err => {
        alert('invalid otp')
      }
    })
    //  this.service.checkUser()
  }


  validateSignupForm(){
    if(!this.password && !this.confirmPassword){
return alert('fill password')
    }
    if(this.password==this.confirmPassword){
      const obj={
        number:this.number,
        password:this.password
  
      }
      this.service.createNewPassword(obj).subscribe({
        next:data=>{
this.router.navigate(['/login'])
        },
        error:err=>{
          console.log(err)
        }
      })
    }
   
  }
}



