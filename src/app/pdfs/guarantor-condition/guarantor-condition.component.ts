import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guarantor-condition',
  templateUrl: './guarantor-condition.component.html',
  styleUrl: './guarantor-condition.component.css'
})
export class GuarantorConditionComponent {
  userData:any;
  number:any;
  isDataAvailable=false;
  profile: string | null = null;
  constructor(private service :ApiService,private route: ActivatedRoute,){
   route.queryParams.subscribe(params => {
      this.number = params['number'];
      service.viewGuarantorByNumber({number:this.number}).subscribe({
        next:data=>{
          this.userData=data;
          this.isDataAvailable=true;
          // this.getImages(data.images)
          // console.log(data)
        },
        error:err=>{
          console.log(err)
        }
      })

    })
  }

  getImages(object:any){
    this.service.imageViewGaurntor(object.profilePictures).subscribe(imageBlob => {
      this.profile = URL.createObjectURL(imageBlob);
     
    });
  }

}
