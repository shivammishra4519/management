import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employe-register',
  templateUrl: './employe-register.component.html',
  styleUrl: './employe-register.component.css'
})
export class EmployeRegisterComponent {

  constructor(private builder:FormBuilder,private service:ApiService) { }

  employeeRegister=this.builder.group({
    name:this.builder.control('',Validators.required),
    number:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.required),
    pin:this.builder.control('', [Validators.required, Validators.pattern("[0-9 ]{4}")]),
    password:this.builder.control('',Validators.required),
    confirmPassword:this.builder.control('',Validators.required)
  })

  register(){
    if(this.employeeRegister.invalid){
      return alert('Fill all details')
    }
    this.service.employeeRegister(this.employeeRegister.value).subscribe({
      next:data=>{
        alert('Employee Register Successfully');
        this.employeeRegister.reset()
      },
      error:err=>{
        alert('somtheing went wrong');
        console.log('error',err)
      }
    })

  }
}

