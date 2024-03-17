import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css'
})
export class UserSettingComponent {
constructor(private router:Router){}
  blockUser(){
    this.router.navigate(['/dashboard/setting/basic-setting'])
  }

}
