import { Component } from '@angular/core';
import { ViewdetailsService } from '../../../services/viewdetails.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-setting',
  templateUrl: './device-setting.component.html',
  styleUrl: './device-setting.component.css'
})
export class DeviceSettingComponent {
  brandName: any;
  brandName1: any;
  homeApplilcesBrands: any;
  constructor(private service: ViewdetailsService, private apiService: ApiService, private toastr: ToastrService) {
    apiService.getAllBrands().subscribe({
      next: data => {
        this.homeApplilcesBrands = data;
        console.log('data', data)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  saveBrand() {
    const brand = this.brandName.toUpperCase();
    this.service.addBrand({ brand }).subscribe({
      next: data => {
        this.brandName = '';
        this.toastr.success('Brand Added Successfully!')
      },
      error: err => {
        this.toastr.error(err.error.message)
      }
    })


  }

  saveBrandHomeAppliance() {
    if (this.brandName1) {
      this.apiService.addHomeAplliancesBrand({ brandName1: this.brandName1 }).subscribe({
        next: data => {
          this.toastr.success('Brand Added Successfully!')
          this.brandName1 = ''
          this.apiService.getAllBrands().subscribe({
            next:data=>{
              this.homeApplilcesBrands=data;
              console.log('data',data)
            },
            error:err=>{
              console.log(err)
            }})
        }, error: err => {
          this.toastr.error(err.error.message)
        }
      })
    }
  }
}
