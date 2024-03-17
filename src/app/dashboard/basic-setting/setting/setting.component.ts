import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
constructor(private router:Router){
  this.userSetting()
}
isSetTemplate=false;
isSmsSend=false;
isUserSetting=false;
  setTemplate(){
this.isSetTemplate=true;
    this.isSmsSend=false;
    this.isUserSetting=false;
this.router.navigate(['/dashboard/setting/set-template'])
  }

  sendSms(){
    this.isSetTemplate=false;
    this.isSmsSend=true;
    this.isUserSetting=false;
    this.router.navigate(['/dashboard/setting/send-sms'])
  };

  userSetting(){
    this.isSetTemplate=false;
    this.isSmsSend=false;
    this.isUserSetting=true;
    this.router.navigate(['/dashboard/setting/user-setting'])
  };
}
