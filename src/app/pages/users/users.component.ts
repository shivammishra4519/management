import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  constructor(private builder: FormBuilder, private service: ApiService) { }

  userRegister = this.builder.group({
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    number: this.builder.control('', Validators.required),
    shopName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    confirmPassword: this.builder.control('', Validators.required),
  });


  register() {
    if (this.userRegister.valid) {
      if (this.userRegister.value.password == this.userRegister.value.confirmPassword) {
        this.service.userRegister(this.userRegister.value).subscribe({
          next: data => {
            this.userRegister.reset();
            alert('user registered successfully')
          },
          error: error => {
            console.log(error)
          }
        })
      }
      else {
        alert('Password and confirm Password must be same')
      }
    }
    else {
      alert('Please fill all fields')
    }
  }

}
