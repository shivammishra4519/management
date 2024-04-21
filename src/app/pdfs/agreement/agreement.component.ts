import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.css'
})
export class AgreementComponent {
  constructor(private route: ActivatedRoute, private service: ApiService,private toastr:ToastrService) { }
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const data = params['data'];
      console.log('data',data)
    });
   
  }


 
}
