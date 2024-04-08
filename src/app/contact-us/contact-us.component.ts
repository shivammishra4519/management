import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor(private builder: FormBuilder,private toaster:ToastrService) { }
  details=this.builder.group({
    name:this.builder.control('',Validators.required),
    number:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.required),
    message:this.builder.control('',Validators.required),
  })
}
