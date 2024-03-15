import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css'
})
export class CustomerRegistrationComponent {

  constructor(private builder: FormBuilder, private service: ApiService, private http: HttpClient, private router: Router) { }
  customerRegistrationForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    number: ['', Validators.required],
    email: ['', Validators.required],
    dob:['',Validators.required],
    panCardNumber: ['', Validators.required],
    adharCardNumber: ['', Validators.required],
    gender: ['1', Validators.required],
    state: ['1', Validators.required],
    district: ['1', Validators.required],
    images: ['', Validators.required],
    address:['',Validators.required]
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

    this.http.post<any>('http://localhost:3000/api/upload', formData, { observe: 'response' }).subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          console.log('Images uploaded successfully');
          console.log(response);

          const img: any = response;
          this.customerRegistrationForm.patchValue({
            images: img.body.filenames
          });
          console.log(this.customerRegistrationForm.value)
          this.service.customerRegister(this.customerRegistrationForm.value).subscribe({
            next:res=>{
              this.router.navigate(['/dashboard/sell-devices', this.customerRegistrationForm.value.number]);
            },
            error:err=>{
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

}
