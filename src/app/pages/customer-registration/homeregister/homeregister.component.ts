import { Component } from '@angular/core';

@Component({
  selector: 'app-homeregister',
  templateUrl: './homeregister.component.html',
  styleUrl: './homeregister.component.css'
})
export class HomeregisterComponent {
  isFindUser=false;
  isByAdhar=true;
  isManual=false;


  registerByAdhar(){
    this.isFindUser=false;
    this.isByAdhar=true;
    this.isManual=false;
  }
  manual(){
    this.isFindUser=false;
    this.isByAdhar=false;
    this.isManual=true;

  }
  findUser(){
    this.isFindUser=true;
    this.isByAdhar=false;
    this.isManual=false;
  }
}
