import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-stock-device',
  templateUrl: './stock-device.component.html',
  styleUrl: './stock-device.component.css'
})
export class StockDeviceComponent {
  devices:any;
constructor(private service:ApiService){
  service.viewAllDevice().subscribe({
    next:data=>{
      this.devices=data;
      console.log(data)
    },
    error:err=>{
      console.log(err)
    }
  })
}

deleteMethod(){

}

}
