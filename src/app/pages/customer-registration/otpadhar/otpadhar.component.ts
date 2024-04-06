import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-otpadhar',
  templateUrl: './otpadhar.component.html',
  styleUrl: './otpadhar.component.css'
})
export class OtpadharComponent {
  otpSection = false;
  isOtpVerfied = true;
  otpSectionAdhar = false;
  verifiedAdhar = false;
  role:any;
  shopNames:any;
  numberOtp=true;
  otpAdharSended=true;
  stateData:any;
  state:any;
  city:any;
  constructor(private builder: FormBuilder, private service: ApiService, private http: HttpClient, private router: Router,private auth:AuthService,private toastr:ToastrService) {
    this.role=auth.role;
    service.viewAllShopName().subscribe({
      next:data=>{
        this.shopNames=data;
      },
      error:err=>{
        
      }
    })
    service.getState().subscribe({
      next: data => {
        this.stateData = data;
        this.state = data.map((obj: any) => obj.state); 
      }
    });
   }
  customerRegistrationForm = this.builder.group({
    firstName: ['', Validators.required],
    number: ['', Validators.required],
    email: ['', Validators.required],
    dob: ['', Validators.required],
    adharCardNumber: ['', Validators.required],
    gender: ['1', Validators.required],
    state: ['1', Validators.required],
    district: ['1', Validators.required],
    images: ['', Validators.required],
    address: ['', Validators.required],
    otp: ['',],
    otpAdhar: ['', ],
    shop: ['', Validators.required],
    fatherName: ['', Validators.required],
    secondIdType: ['', Validators.required],
    secondId: ['', Validators.required],

  });

  registerCustomer() {
    const formData = new FormData();

    this.profilePictures.forEach(image => {
      formData.append('profilePictures', image);
    });

    this.panCardImages.forEach(image => {
      formData.append('panCardImages', image);
    });

    this.adharCardImages.forEach(image => {
      formData.append('adharCardImages', image);
    });

    this.otherDocumentImages.forEach(image => {
      formData.append('otherDocumentImages', image);
    });

    this.http.post<any>(`${environment.apiUrl}api/upload`, formData, { observe: 'response' }).subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          const img: any = response;
          this.customerRegistrationForm.patchValue({
            images: img.body.filenames
          });


          if (!this.isOtpVerfied) {
            this.toastr.error('Mobile number not Verified');
          }
          else{
           if(false){
            this.toastr.error('Fill all details')
           }else[
            this.service.customerRegister(this.customerRegistrationForm.value).subscribe({
              next: res => {
                this.toastr.success('Customer Registred Successfully')
                this.router.navigate(['/dashboard/sell-devices', this.customerRegistrationForm.value.number]);
              },
              error: err => {
               
                this.toastr.error(err.error.message)
              }
            })
           ]
          }
         
        } else {
          this.toastr.error('Upload Image again')
        }
      },
      (error) => {
        this.toastr.error('Error uploading images')
      }
    );
  }

  profilePictures: File[] = [];
  panCardImages: File[] = [];
  adharCardImages: File[] = [];
  otherDocumentImages: File[] = [];

  onProfilePictureSelected(event: any) {
    this.profilePictures.push(event.target.files[0]);
    console.log(this.profilePictures)
  }

  onPanCardSelected(event: any) {
    this.panCardImages.push(event.target.files[0]);
  }

  onAdharCardSelected(event: any) {
    this.adharCardImages.push(event.target.files[0]);
  }

  onOtherDocumentSelected(event: any) {
    this.otherDocumentImages.push(event.target.files[0]);
  }

  otp: any
  template: any
  message: any;
  number: any
  sendOtp() {
    const number = this.customerRegistrationForm.value.number;
    this.number = number;
    if (number) {
      this.service.sendOtp({ number: number, type: 'OTP1' }).subscribe({
        next: data => {
          this.otpSection = true
          this.numberOtp=false;
          this.toastr.success('Otp send to Your Number')
        },
        error: err => {
          this.toastr.error('Somtheing went wrong')
        }
      })
    } else {
      this.toastr.error('Somtheing went wrong')
    }
  }


  verifyOtp() {
    const obj = {
      number: this.number,
      otp: this.customerRegistrationForm.value.otp
    }
    this.service.verifyeOtp(obj).subscribe({
      next: data => {
        this.isOtpVerfied = true;
        this.otpSection=false;
        this.toastr.success('OTP Verifyed Successfully')
      },
      error: err => {
        this.toastr.error('Invalid OTP')
      }
    })
  }




  sendAdharOtp() {
    const adhar = this.customerRegistrationForm.value.adharCardNumber;
    if (adhar) {
      this.service.verifyAdhar({ Aadhaarid: adhar }).subscribe({
        next: data => {
          this.otpSectionAdhar = true;
          this.otpAdharSended=false;
          this.toastr.success('OTP Send!')
        }
      })
    }

  }
  verifyAdharOtp() {
    const adhar = this.customerRegistrationForm.value.adharCardNumber;
    const otp = this.customerRegistrationForm.value.otpAdhar;
    const obj = {
      Aadhaarid: adhar,
      otp: otp
    }
    this.service.verifyAdharOtp(obj).subscribe({
      next: data => {
        this.verifiedAdhar = true
        this.customerRegistrationForm.patchValue({
          firstName: data.name,
          dob:data.dob,
          fatherName:data.father

        })
        this.otpSectionAdhar = false;
        this.toastr.success('OTP VERFIYED')
      }
    })
  }

 



  onStateSelect(event: Event) {
    const state = (event.target as HTMLSelectElement).value;
    if(state=='1'){
      this.toastr.warning('Select A Valid State')
    }
else{
  this.city = this.stateData
  .filter((item: any) => item.state === state) // Filter items with the specified state
  .flatMap((item: any) => item.cities); // Extract cities from the filtered items
}
  }
  

  onCitySelect(event: Event){
    const state = (event.target as HTMLSelectElement).value;
    if(state=='1'){
      this.toastr.warning('Select A Valid State')
    }
  }

}
