import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-termscondtion',
  templateUrl: './termscondtion.component.html',
  styleUrls: ['./termscondtion.component.css']
})
export class TermscondtionComponent {
  profile: string | null = null;
  deviceData: any;
  installments: any;
  imageSubscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private service: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const data = params['data'];
      this.service.viewDeviceByCustomerId({ number: data }).subscribe({
        next: (data: any) => {
          this.deviceData = data;
          this.installments = data.installments;
        },
        error: (error) => {
          console.error('Error fetching device data:', error);
        }
      });

      this.service.viewCustomerImageName({ number: parseInt(data) }).subscribe({
        next: (data: any) => {
          
          this.getImages(data);
        },
        error: (error) => {
          console.error('Error fetching image data:', error);
        }
      });
    });
  }

  // ngOnDestroy(): void {
  //   // Unsubscribe from all image subscriptions to prevent memory leaks
  //   this.imageSubscriptions.forEach(sub => sub.unsubscribe());
  // }

  getImages(object:any){
    this.service.imageView(object.profilePictures).subscribe(imageBlob => {
      this.profile = URL.createObjectURL(imageBlob);
      console.log(this.profile)
    });
  
  }


}
