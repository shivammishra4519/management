import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { CustomerDataService } from '../../datasharing/customer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guarantor',
  templateUrl: './guarantor.component.html',
  styleUrl: './guarantor.component.css'
})
export class GuarantorComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ApiService, private dataSharing: CustomerDataService,private router:Router) { }

  guarantorForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    fatherName: this.builder.control('', Validators.required),
    aadharNumber: this.builder.control('', Validators.required),
    number: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    images: this.builder.control('',),
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
      formData.append('adharFront', image);
    });

    this.aadharCardImagesBack.forEach(image => {
      formData.append('adharCardBack', image);
    });


    if (this.guarantorForm.invalid) {
      this.toastr.error('fill All details');
      return
    }

    this.service.checkGauartor(this.guarantorForm.value).subscribe({
      next: data => {
        console.log(data)
        if (data.status == 0) {
          this.service.registerGuarantor(this.guarantorForm.value).subscribe({
            next: data => {
              this.dataSharing.setGuarantorData(this.guarantorForm.value);
              this.router.navigate(['/dashboard/sell-device'])
              this.toastr.success('Gaurantor Registred Successfullyy')
            }, error: err => {
              console.log(err)
            }
          })
        }
        else {
          this.toastr.error('User Already Exit')
        }
      }
    })


  }
}
