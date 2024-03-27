import { Component } from '@angular/core';
import { DatasharingService } from '../../../services/datasharing.service';

@Component({
  selector: 'app-setting-body',
  templateUrl: './setting-body.component.html',
  styleUrl: './setting-body.component.css'
})
export class SettingBodyComponent {
  isManageDevices=false;
constructor(private dataSharing:DatasharingService){
  this.isManageDevices=this.dataSharing.isManageDevice;
}

}
