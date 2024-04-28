import { Component } from '@angular/core';
import { DatasharingService } from '../../services/datasharing.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent {

  customerData: any;
  customerInfo: any;
  profile: string | null = null; // Initialize imageUrl as null
  adhar: string | null = null; // Initialize imageUrl as null
  back: string | null = null; // Initialize imageUrl as null
  pan: string | null = null; // Initialize imageUrl as null

  constructor(private dataService: DatasharingService, private service: ApiService) { }

  ngOnInit(): void {
    this.dataService.getCustomerData().subscribe(data => {
      this.customerData = data;
      this.service.viewProfile(this.customerData).subscribe({
        next: (res: any) => {
          this.customerInfo = res;
          const imageName = this.customerInfo.images;
          this.getImages(imageName);
        },
        error: err => {
          console.log(err);
        }
      });
    });
  }



  getImages(object:any){
    this.service.imageView(object.profilePictures).subscribe(imageBlob => {
      this.profile = URL.createObjectURL(imageBlob);
      console.log(this.profile)
    });
    this.service.imageView(object.panCardImages).subscribe(imageBlob => {
      this.pan = URL.createObjectURL(imageBlob);
    });
    this.service.imageView(object.adharCardImages).subscribe(imageBlob => {
      this.adhar = URL.createObjectURL(imageBlob);
    });
    this.service.imageView(object.otherDocumentImages).subscribe(imageBlob => {
      this.back = URL.createObjectURL(imageBlob);
    });
  }

  userData: any;
  


  isProfile = true;
  ischangePass = false;

  passWordChange() {
    this.ischangePass = true;
    this.isProfile = false;
  }

 


}
