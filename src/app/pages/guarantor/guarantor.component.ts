import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { CustomerDataService } from '../../datasharing/customer-data.service';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-guarantor',
  templateUrl: './guarantor.component.html',
  styleUrl: './guarantor.component.css'
})
export class GuarantorComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ApiService, private dataSharing: CustomerDataService, private router: Router, private http: HttpClient) { }
  otpSection = true;
  numberOtp = false;
  isOtpVerfied = false;
  isOtpsended = false;
  guarantorForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    fatherName: this.builder.control('', Validators.required),
    aadharNumber: this.builder.control('', Validators.required),
    number: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    images: this.builder.control('',),
    otp: this.builder.control('',),
  })

  profilePictures: File[] = [];
  aadharCardImagesFront: File[] = [];
  aadharCardImagesBack: File[] = [];
  onProfilePictureSelected(event: any) {
    this.profilePictures = [];
    const selectedProfilePicture = event.target.files[0];

    if (this.aadharCardImagesFront && this.aadharCardImagesFront.length > 0) {
      const adharImage = this.aadharCardImagesFront[0].name;
      if (selectedProfilePicture.name === adharImage) {
        this.toastr.error('Image Already Uploaded In Adhar Front');
        this.profilePictures = [];
        return;
      }
    }

    if (this.aadharCardImagesBack && this.aadharCardImagesBack.length > 0) {
      const adharCardImageName = this.aadharCardImagesBack[0].name;
      if (selectedProfilePicture.name === adharCardImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Back');
        this.profilePictures = [];
        return;
      }
    }
    this.profilePictures.push(selectedProfilePicture);
  }


  onAadharPictureSelected(event: any) {
    this.aadharCardImagesFront = [];
    const selectedPicture = event.target.files[0];

    if (this.profilePictures && this.profilePictures.length > 0) {
      const adharImage = this.profilePictures[0].name;
      if (selectedPicture.name === adharImage) {
        this.toastr.error('Image Already Uploaded In Profile ');
        this.aadharCardImagesFront = [];
        return;
      }
    }

    if (this.aadharCardImagesBack && this.aadharCardImagesBack.length > 0) {
      const adharCardImageName = this.aadharCardImagesBack[0].name;
      if (selectedPicture.name === adharCardImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Back');
        this.aadharCardImagesFront = [];
        return;
      }
    }
    this.aadharCardImagesFront.push(selectedPicture);
  }

  onAadharPictureBack(event: any) {
    this.aadharCardImagesBack = [];
    const selectedPicture = event.target.files[0];

    if (this.profilePictures && this.profilePictures.length > 0) {
      const adharImage = this.profilePictures[0].name;
      if (selectedPicture.name === adharImage) {
        this.toastr.error('Image Already Uploaded In Profile ');
        this.aadharCardImagesBack = [];
        return;
      }
    }

    if (this.aadharCardImagesFront && this.aadharCardImagesFront.length > 0) {
      const adharCardImageName = this.aadharCardImagesFront[0].name;
      if (selectedPicture.name === adharCardImageName) {
        this.toastr.error('Image Already Uploaded In AdharCard Front');
        this.aadharCardImagesBack = [];
        return;
      }
    }
    this.aadharCardImagesBack.push(selectedPicture);
  }

  register() {
    const formData = new FormData();
    if (this.profilePictures.length <= 0) {
      this.toastr.error('upload profile picture');
      return
    }
    if (this.aadharCardImagesBack.length <= 0) {
      this.toastr.error('upload adhar back image');
      return
    }

    if (this.aadharCardImagesFront.length <= 0) {
      this.toastr.error('upload adhar front image');
      return
    }

    this.profilePictures.forEach(image => {
      formData.append('profilePictures', image);
    });
    
    this.aadharCardImagesFront.forEach(image => {
      formData.append('aadharCardImagesFront', image);
    });
    
    this.aadharCardImagesBack.forEach(image => {
      formData.append('aadharCardImagesBack', image);
    });
    


    if (this.guarantorForm.invalid) {
      this.toastr.error('fill All details');
      return
    }

    if (!this.isOtpVerfied) {
      this.toastr.error('Number Not verifyed');
      return
    }

    this.service.checkGauartor(this.guarantorForm.value).subscribe({
      next: data => {
        console.log(data)
        if (data.status == 0) {
          this.http.post<any>(`${environment.apiUrl}guarantor/upload/guarantor`, formData, { observe: 'response' }).subscribe(
            (response) => {
              if (response instanceof HttpResponse) {
                console.log(response)
                const img: any = response;
                this.guarantorForm.patchValue({
                  images: img.body.filenames
                });

                this.service.registerGuarantor(this.guarantorForm.value).subscribe({
                  next: data => {
                   
                    this.dataSharing.setGuarantorData(this.guarantorForm.value);
                    this.router.navigate(['/dashboard/sell-device'])
                    this.toastr.success('Gaurantor Registred Successfullyy')
                  }, error: err => {
                    console.log(err)
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
        else {
          this.toastr.error('User Already Exit')
        }
      }
    })


  }

  sendOtp() {
    const number: any = this.guarantorForm.value.number;
    const str = number.toString()
    const numLengt = str.length;
    if (numLengt == 10) {
      this.service.sendOtp({ number: number, type: 'OTP1' }).subscribe({
        next: data => {
          this.otpSection = false
          this.numberOtp = true;
          this.isOtpsended = true
          this.toastr.success('Otp send to Your Number')
        },
        error: err => {
          this.toastr.error('Somtheing went wrong')
        }
      })
    } else {
      this.toastr.error('Please Enter A Valid Number')
    }
  }



  verifyOtp() {
    const obj = {
      number: this.guarantorForm.value.number,
      otp: this.guarantorForm.value.otp
    }
    this.service.verifyeOtp(obj).subscribe({
      next: data => {
        this.isOtpVerfied = true;
        this.otpSection = false;
        this.numberOtp = false;
        this.toastr.success('OTP Verifyed Successfully')
      },
      error: err => {
        this.toastr.error('Invalid OTP')
      }
    })
  }

  onNumber(event: any) {
    const num = parseInt((event.target as HTMLSelectElement).value);
    const str = num.toString()
    const numLengt = str.length;
    if (numLengt == 10) {
      this.service.verfyGaurantor({ number: num }).subscribe({
        next: data => {
         
          if (data.status == 0) {

          }
          if (data.status == 1) {
            console.log("gg",data)
            this.dataSharing.setGuarantorData(data.data);
            // this.router.navigate(['/dashboard/sell-device'])
            this.toastr.success('Gaurantor Alreday Exit')
          }

        }, error: err => {
          this.toastr.error(err.error.message);
          this.guarantorForm.reset();
        }
      })
    } else {
      this.toastr.error('Please Enter A Valid Number')
    }
  }
  onAdhar(event: any){

  }
}
