import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css'
})
export class CustomerRegistrationComponent {

  constructor(private builder: FormBuilder, private service: ApiService, private http: HttpClient) { }
  customerRegistrationForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    number: ['', Validators.required],
    email: ['', Validators.required],
    panCardNumber: ['', Validators.required],
    adharCardNumber: ['', Validators.required],
    gender: ['', Validators.required],
    state: ['1', Validators.required],
    district: ['1', Validators.required],
    images: ['', Validators.required],
  })
  images: File[] = [];


  registerCustomer() {
    // this.service.customerRegister(this.customerRegistrationForm.value).subscribe((res: any) => {
    //   console.log(res)
    //   this.customerRegistrationForm.reset();
    //   alert('customer added suceessfully')
    // })

    const formData = new FormData();
    this.images.forEach(image => {
      formData.append('images', image);
    });

    this.http.post<any>('http://localhost:3000/api/upload', formData, { observe: 'response' }).subscribe(
      (response) => {
        if (response instanceof HttpResponse) {
          console.log('Images uploaded successfully');
          console.log(response);
          this.updateImagesArray(response)
          const img: any = response;
          this.customerRegistrationForm.patchValue({
            images: img.body.filenames
          });
          console.log(this.customerRegistrationForm.value)
          this.service.customerRegister(this.customerRegistrationForm.value).subscribe((res) => {
            console.log(this.imagesArray, "updated")
            alert("success")
            console.log("res", res)
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





  imagesArray: any[] = [];

  onProfilePictureSelected(event: any) {
    this.images.push(event.target.files[0]);
    const obj = { profile: event.target.files[0].name };
    this.imagesArray.push(obj);
    console.log(event.target.files[0].name);
  }

  onPanCardSelected(event: any) {
    this.images.push(event.target.files[0]);
    const obj = { pancard: event.target.files[0].name };
    this.imagesArray.push(obj);
    console.log(event.target.files[0].name);
  }

  onAdharCardSelected(event: any) {
    this.images.push(event.target.files[0]);
    const obj = { adharcard1: event.target.files[0].name };
    this.imagesArray.push(obj);
    console.log(event.target.files[0].name);
  }

  onOtherDocumentSelected(event: any) {
    this.images.push(event.target.files[0]);
    const obj = { adharcard2: event.target.files[0].name };
    this.imagesArray.push(obj);
    console.log(event.target.files[0].name);
  }



  updateImagesArray(response: any) {
    const filenames: string[] = response.filenames;
    const message: string = response.message;
    filenames.forEach(value => {
      this.imagesArray.forEach(value2 => {
        const extractedValue1 = value.split('-')[1].trim();
        const extractedValue2 = value2.trim();
      })
    })



  }



}
