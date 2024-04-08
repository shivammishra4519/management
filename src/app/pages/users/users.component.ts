import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  constructor(private builder: FormBuilder, private service: ApiService,private toastr:ToastrService) { }

  userRegister = this.builder.group({
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    number: this.builder.control('', Validators.required),
    shopName: this.builder.control('', Validators.required),
    pin: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    confirmPassword: this.builder.control('', Validators.required),
  });


  register() {
    if (this.userRegister.valid) {
      if (this.userRegister.value.password == this.userRegister.value.confirmPassword) {
        this.service.userRegister(this.userRegister.value).subscribe({
          next: data => {
            this.userRegister.reset();
            this.toastr.success('user registered successfully');
          },
          error: error => {
            this.toastr.error(error.error.message)
          }
        })
      }
      else {
        this.toastr.error('Password and confirm Password must be same')
      }
    }
    else {
     this.toastr.error('fill all details')
    }
  }

}
