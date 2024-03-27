import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { error } from 'node:console';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private builder: FormBuilder,private service:ApiService, private cookieService: CookieService) { }
  loginForm = this.builder.group({
    number: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })



 
  login() {

    if(this.loginForm.value){
      console.log(2)
      this.service.login(this.loginForm.value).subscribe({
        next:data=>{
          // this.loginForm.setValue(data.token);
          // this.cookieService.set('jwtToken', data.token);
          localStorage.setItem('token',data.token)
          this.router.navigate(['dashboard'])

        },
        error:error=>{
          console.log(error)
        }
      })
    }
    console.log(this.loginForm.value)
    // this.router.navigate(['dashboard'])
  }

  forgetPaasword(){
    this.router.navigate(['/forget-password'])
  }
  
}
