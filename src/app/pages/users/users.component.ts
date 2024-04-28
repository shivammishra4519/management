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
  stateData:any;
  state: any;
  city: any;
  constructor(private builder: FormBuilder, private service: ApiService,private toastr:ToastrService) { 
    service.getState().subscribe({
      next: data => {
        this.stateData = data;
        this.state = data.map((obj: any) => obj.state);
      }
    });
  }


  userRegister = this.builder.group({
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    number: this.builder.control('', Validators.required),
    shopName: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    state: ['1', Validators.required],
    district: ['1', Validators.required],
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

}
