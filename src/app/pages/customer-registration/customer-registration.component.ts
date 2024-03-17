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
  otpSection = false;
  verified = false;
  constructor(private builder: FormBuilder, private service: ApiService, private http: HttpClient, private router: Router) { }
  customerRegistrationForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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
    otp: ['', Validators.required]
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


    this.service.sendOtp().subscribe({
      next: data => {
        this.otp = data;
        console.log(data)
      }
    })

    this.service.getTemplateByType({ type: "OTP1" }).subscribe({
      next: data => {
        this.template = data;
        const tempMessage = data.template;
        this.message = tempMessage.replace("{#var#}", this.otp);
        console.log(this.message);
      },
      error: er => {
        console.log(er)
      }
    })
    this.number = this.customerRegistrationForm.value.number;
    this.otpSection = true



  }
  verifyOtp() {
    let htmlbody = `
  
    <form action="${this.template.api}" method="GET">
    <label for="key">key:</label>
    <input type="text" id="key" name="key" value="36138A813805F9"><br><br>
    
    <label for="campaign">Campaign:</label>
    <input type="text" id="campaign" name="campaign" value="13393"><br><br>
    
    <label for="routeid">Route ID:</label>
    <input type="text" id="routeid" name="routeid" value="30"><br><br>
    
    <label for="type">Type:</label>
    <input type="text" id="type" name="type" value="text"><br><br>
    
    <label for="contacts">Contacts:</label>
    <input type="text" id="contacts" name="contacts" value="${this.number}"><br><br>
    
    <label for="senderid">Sender ID:</label>
    <input type="text" id="senderid" name="senderid" value="OMTRDE"><br><br>
    
    <label for="msg">Message:</label><br>
    <textarea id="msg" name="msg" rows="4" cols="50">${this.message}</textarea><br><br>
    
    <label for="template_id">Template ID:</label>
    <input type="text" id="template_id" name="template_id" value="1207170920832124039"><br><br>
    
    <label for="pe_id">PE ID:</label>
    <input type="text" id="pe_id" name="pe_id" value="1201163058752081861"><br><br>
    
    <input type="submit" value="Submit">
  </form>
  
    `


    const winUrl = URL.createObjectURL(
      new Blob([htmlbody], { type: "text/html" })
    );
    window.location.href = winUrl;
  }
}
