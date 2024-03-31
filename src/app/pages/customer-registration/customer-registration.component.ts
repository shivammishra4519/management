import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment';



@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css'
})
export class CustomerRegistrationComponent {
  otpSection = false;
  verified = false;
  isOtpVerfied = false;
  otpSectionAdhar = true;
  verifiedAdhar = false;
  panverifyed = false;
  constructor(private builder: FormBuilder, private service: ApiService, private http: HttpClient, private router: Router) { }
  customerRegistrationForm = this.builder.group({
    firstName: ['', Validators.required],
    number: ['', Validators.required],
    email: ['', Validators.required],
    dob: ['', Validators.required],
    panCardNumber: ['', Validators.required],
    adharCardNumber: ['', Validators.required],
    gender: ['1', Validators.required],
    state: ['1', Validators.required],
    district: ['1', Validators.required],
    images: ['', Validators.required],
    address: ['', Validators.required],
    otp: ['', Validators.required],
    otpAdhar: ['', Validators.required],
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
          console.log('Images uploaded successfully');
          console.log(response);

          const img: any = response;
          this.customerRegistrationForm.patchValue({
            images: img.body.filenames
          });


          if (!this.isOtpVerfied) {
            return alert('Mobile number not verifyed');
          }
          this.service.customerRegister(this.customerRegistrationForm.value).subscribe({
            next: res => {
              this.router.navigate(['/dashboard/sell-devices', this.customerRegistrationForm.value.number]);
            },
            error: err => {
              console.log(err)
            }
          })
        } else {
          console.log('Non-JSON response:', response);
        }
      },
      (error) => {
        console.error('Error uploading images:', error);
      }
    );
  }

  profilePictures: File[] = [];
  panCardImages: File[] = [];
  adharCardImages: File[] = [];
  otherDocumentImages: File[] = [];

  onProfilePictureSelected(event: any) {
    this.profilePictures.push(event.target.files[0]);
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
          console.log(data)
        },
        error: err => {
          console.log(err)
        }
      })
    } else {
      alert('somtheing went wrong')
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
        this.verified = true
      },
      error: err => {
        alert('invalid otp')
      }
    })
  }




  sendAdharOtp() {
    const adhar = this.customerRegistrationForm.value.adharCardNumber;
    if (adhar) {
      this.service.verifyAdhar({ Aadhaarid: adhar }).subscribe({
        next: data => {
          console.log(data)
          this.otpSectionAdhar = true;
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
          dob:data.dob
        })
        console.log("name",data);
      }
    })
  }

  verifyPan() {
    const panId = this.customerRegistrationForm.value.panCardNumber;
    this.service.verifyPan({ Panid: panId }).subscribe({
      next: data => {
        this.panverifyed = true;
        console.log(data)
      }
    })
  }
  
}
