import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environment';
import { CustomerDataService } from '../../../datasharing/customer-data.service';

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
  role: any;
  shopNames: any;
  numberOtp = true;
  otpAdharSended = true;
  stateData: any;
  state: any;
  city: any;
  isAdharOtpVerify: any;
  constructor(private builder: FormBuilder, private service: ApiService, private http: HttpClient, private router: Router, private auth: AuthService, private toastr: ToastrService, private customerService: CustomerDataService) {
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
    images: ['', Validators.required],
    address: ['', Validators.required],
    otp: ['',],
    otpAdhar: ['',],
    shop: ['', Validators.required],
    fatherName: ['', Validators.required],
    secondIdType: ['1', Validators.required],
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

    if (this.customerRegistrationForm.invalid) {
      this.toastr.error('fill all details');
      return
    }
    const dobValue:any = this.customerRegistrationForm.value.dob;

    // Calculate age based on the date of birth
    const today = new Date();
    const birthDate = new Date(dobValue);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // If the birthday hasn't occurred yet this year, subtract one year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Perform validation based on age
    if (age < 18) {
      this.toastr.error('Customer age cannot be less than 18');
      return;
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

    if (!this.isOtpVerfied) {
      this.toastr.error('mobile number not verifyed');
      return;
    }

    if (!this.verifiedAdhar) {
      this.toastr.error('Adhar number verifyed');
      return;
    }

    this.service.checkIsCustomer(this.customerRegistrationForm.value).subscribe({
      next: data => {
        const isAlreadyExit = data.status;
        if (isAlreadyExit == 1) {
          this.toastr.error('Customer Already Exit!');
          return
        }


        if (isAlreadyExit == 0) {
          this.http.post<any>(`${environment.apiUrl}api/upload`, formData, { observe: 'response' }).subscribe(
            (response) => {
              if (response instanceof HttpResponse) {
                const img: any = response;
                this.customerRegistrationForm.patchValue({
                  images: img.body.filenames
                });

                this.service.customerRegister(this.customerRegistrationForm.value).subscribe({
                  next: data => {
                    this.customerService.setCustomerData(this.customerRegistrationForm.value);
                    this.toastr.success('customer registred successfully');
                    this.router.navigate(['/dashboard/sell-device']);
                  }, error: err => {
                    this.toastr.error('somtheing went wrong please try again');
                  }
                })
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
        }
        else{
          this.toastr.error('Somtheing went wrong')
        }

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
    this.otherDocumentImages = [];
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
    const number: any = this.customerRegistrationForm.value.number;
    this.number = number;
    const numberStr = number.toString();
    const numLenght = numberStr.length;

    if (numLenght == 10) {
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
      this.toastr.error('Please Enter a valid number');
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
          dob: data.dob,
          fatherName: data.father
        })
        this.otpSectionAdhar = false;
        this.toastr.success('OTP VERFIYED')
      }
    })
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
