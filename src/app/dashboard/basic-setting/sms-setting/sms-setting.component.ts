import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-sms-setting',
  templateUrl: './sms-setting.component.html',
  styleUrl: './sms-setting.component.css'
})
export class SmsSettingComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ApiService) { }
  addApi = this.builder.group({
    apiType: this.builder.control('0', Validators.required),
    apiUrl: this.builder.control('', Validators.required),
    apiMethod: this.builder.control('GET', Validators.required),
    body: this.builder.control(''),
  })


  submitRequest() {
    if (this.addApi.invalid) {
      this.toastr.error('Fill Mendate Details');
      return
    }
    this.service.setApi(this.addApi.value).subscribe({
      next: data => {
        this.toastr.success("Api saved successfully");
        this.addApi.reset();
      },
      error: err => {
        this.toastr.error(err.error.message)
      }
    })
  }
}
