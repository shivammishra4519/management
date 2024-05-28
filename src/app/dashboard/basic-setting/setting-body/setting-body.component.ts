import { Component } from '@angular/core';
import { DatasharingService } from '../../../services/datasharing.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-setting-body',
  templateUrl: './setting-body.component.html',
  styleUrl: './setting-body.component.css'
})
export class SettingBodyComponent {
  apiData:any;
constructor(private service:ApiService){
service.viewApi().subscribe(res=>{
  this.apiData=res
})
}

deleteRow(){
  
}
}
