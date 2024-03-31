import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private builder: FormBuilder,private service:ApiService,private toastr: ToastrService) { }
  loginForm = this.builder.group({
    number: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })



 
  login() {

    if(this.loginForm.value){
      this.service.login(this.loginForm.value).subscribe({
        next:data=>{
          // this.loginForm.setValue(data.token);
          // this.cookieService.set('jwtToken', data.token);
          localStorage.setItem('token',data.token)
          this.toastr.success('login successfully')
          this.router.navigate(['dashboard'])

        },
        error:error=>{
          // console.log(error.error.message)
          this.toastr.error((error.error.message))
        }
      })
    }
    
  }

  forgetPaasword(){
    this.router.navigate(['/forget-password'])
  }
  
}
