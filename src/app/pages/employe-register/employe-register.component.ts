import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { WalletcheckComponent } from '../../popup/walletcheck/walletcheck.component';
@Component({
  selector: 'app-employe-register',
  templateUrl: './employe-register.component.html',
  styleUrl: './employe-register.component.css'
})
export class EmployeRegisterComponent {
data:any
active=true;
  
  constructor(private builder:FormBuilder,private service:ApiService, private dialog: MatDialog) {
    service.getEmployeeList().subscribe({
next:data=>{
  this.data=data;
}
    })
   }

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
        this.employeeRegister.reset();
        this.service.getEmployeeList().subscribe({
          next: (data: any) => {
            this.data = data;
          }
        })
        
      },
      error:err=>{
        alert('somtheing went wrong');
        console.log('error',err)
      }
    })

  }

  changeStatus(data: any) {
    this.service.updateStatus(data).subscribe({
      next: data => {
        this.service.getEmployeeList().subscribe({
          next: (data: any) => {
            this.data = data;
          }
        })
      }
    })
  }

  openDialog(data:any) {
    const dialogRef = this.dialog.open(WalletcheckComponent, {
      width: '400px', // Adjust the width as needed

      data: { data}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}

