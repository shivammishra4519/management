import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environment';
import { CustomerDataService } from '../../../datasharing/customer-data.service';

@Component({
  selector: 'app-noneotp',
  templateUrl: './noneotp.component.html',
  styleUrl: './noneotp.component.css'
})
export class NoneotpComponent {
  otpSection = false;
  isOtpVerfied = true;
  otpSectionAdhar = false;
  verifiedAdhar = false;
  panverifyed = false;
  role: any;
  shopNames: any;
  numberOtp = true;
  otpAdharSended = true;
  stateData: any;
  state: any;
  city: any;
  constructor(private builder: FormBuilder, private service: ApiService, private http: HttpClient, private router: Router, private auth: AuthService, private toastr: ToastrService,private customerService:CustomerDataService) {
    this.role = auth.role;
    service.viewAllShopName().subscribe({
      next: data => {
        this.shopNames = data;
      },
      error: err => {

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
    images: ['',],
    address: ['', Validators.required],
    otp: ['',],
    otpAdhar: ['',],
    shop: ['', Validators.required],
    fatherName: ['', Validators.required],
    secondIdType: ['0', Validators.required],
    secondId: ['', Validators.required],
  });

  registerCustomer() {
    const formData = new FormData();
    if (this.profilePictures.length <= 0) {
      this.toastr.error('upload profile picture');
      return
    }
    if (this.adharCardImages.length <= 0) {
      this.toastr.error('upload adhar front image');
      return
    }

    if (this.otherDocumentImages.length <= 0) {
      this.toastr.error('upload adhar back image');
      return
    }
    if (this.panCardImages.length <= 0) {
      this.toastr.error('upload adhar second id');
      return
    }

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

    if (this.customerRegistrationForm.invalid) {
      this.toastr.error('fill all details');
      return
    }
    if (!this.isOtpVerfied) {
      this.toastr.error('mobile number not verifyed');
      return;
    }
    this.http.post<any>(`${environment.apiUrl}api/upload`, formData, { observe: 'response' }).subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          const img: any = response;
          this.customerRegistrationForm.patchValue({
            images: img.body.filenames
          });
        } else {
          this.toastr.error('Upload Image again')
          return
        }
      },
      (error) => {
        this.toastr.error('Error uploading images')
        return
      }
    );

    this.service.customerRegister(this.customerRegistrationForm.value).subscribe({
      next: data => {
        this.customerService.setCustomerData(this.customerRegistrationForm.value);
        this.toastr.success('customer registred successfully');
        this.router.navigate(['/dashboard/sell-device']);
      }, error: err => {
        this.toastr.error('somtheing went wrong please try again');
      }
    })




  }

  profilePictures: File[] = [];
  panCardImages: File[] = [];
  adharCardImages: File[] = [];
  otherDocumentImages: File[] = [];

  onProfilePictureSelected(event: any) {
    this.profilePictures = [];
    const selectedProfilePicture = event.target.files[0];

    if (this.panCardImages && this.panCardImages.length > 0) {
      const panCardImageName = this.panCardImages[0].name;
      if (selectedProfilePicture.name === panCardImageName) {
        this.toastr.error('Image Already Uploaded In Second Id');
        this.profilePictures = [];
        return;
      }
    }

    if (this.adharCardImages && this.adharCardImages.length > 0) {
      const adharCardImageName = this.adharCardImages[0].name;
      if (selectedProfilePicture.name === adharCardImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Front');
        this.profilePictures = [];
        return;
      }
    }

    if (this.otherDocumentImages && this.otherDocumentImages.length > 0) {
      const otherDocumentImageName = this.otherDocumentImages[0].name;
      if (selectedProfilePicture.name === otherDocumentImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Back');
        this.profilePictures = [];
        return;
      }
    }

    // If the selected profile picture is not a duplicate, add it to the profilePictures array
    this.profilePictures.push(selectedProfilePicture);
  }


  onPanCardSelected(event: any) {
    this.panCardImages = []
    const selectedPicture = event.target.files[0];
    if (this.profilePictures && this.profilePictures.length > 0) {
      const profileImage = this.profilePictures[0].name;
      if (selectedPicture.name === profileImage) {
        this.toastr.error('Image Already Uploaded In Profile');
        this.panCardImages = []
        return;
      }
    }

    if (this.adharCardImages && this.adharCardImages.length > 0) {
      const adharCardImageName = this.adharCardImages[0].name;
      if (selectedPicture.name === adharCardImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Front');
        this.panCardImages = []
        return;
      }
    }

    if (this.otherDocumentImages && this.otherDocumentImages.length > 0) {
      const otherDocumentImageName = this.otherDocumentImages[0].name;
      if (selectedPicture.name === otherDocumentImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Back');
        this.panCardImages = []
        return;
      }
    }
    this.panCardImages.push(selectedPicture)
  }

  onAdharCardSelected(event: any) {
    this.adharCardImages = []
    const selectedPicture = event.target.files[0];
    if (this.panCardImages && this.panCardImages.length > 0) {
      const panCardImageName = this.panCardImages[0].name;
      if (selectedPicture.name === panCardImageName) {
        this.toastr.error('Image Already Uploaded In Second Id');
        this.adharCardImages = []
        return;
      }
    }

    if (this.profilePictures && this.profilePictures.length > 0) {
      const profileImage = this.profilePictures[0].name;
      if (selectedPicture.name === profileImage) {
        this.toastr.error('Image Already Uploaded In Profile');
        this.adharCardImages = []
        return;
      }
    }

    if (this.otherDocumentImages && this.otherDocumentImages.length > 0) {
      const otherDocumentImageName = this.otherDocumentImages[0].name;
      if (selectedPicture.name === otherDocumentImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Back');
        this.adharCardImages = []
        return;
      }
    }
    this.adharCardImages.push(selectedPicture)

  }

  onOtherDocumentSelected(event: any) {
    this.otherDocumentImages = []
    this.adharCardImages = []
    const selectedPicture = event.target.files[0];
    if (this.panCardImages && this.panCardImages.length > 0) {
      const panCardImageName = this.panCardImages[0].name;
      if (selectedPicture.name === panCardImageName) {
        this.toastr.error('Image Already Uploaded In Second Id');
        this.otherDocumentImages = []
        return;
      }
    }

    if (this.adharCardImages && this.adharCardImages.length > 0) {
      const adharCardImageName = this.adharCardImages[0].name;
      if (selectedPicture.name === adharCardImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Front');
        this.otherDocumentImages = []
        return;
      }
    }

    if (this.profilePictures && this.profilePictures.length > 0) {
      const profileImage = this.profilePictures[0].name;
      if (selectedPicture.name === profileImage) {
        this.toastr.error('Image Already Uploaded In Profile');
        this.otherDocumentImages = []
        this.panCardImages = []
        return;
      }
    }
    this.otherDocumentImages.push(selectedPicture)
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
          this.numberOtp = false;
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
        this.otpSection = false;
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
          this.otpAdharSended = false;
          this.toastr.success('OTP Send!')
        }
      })
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
