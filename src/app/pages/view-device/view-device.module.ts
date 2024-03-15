import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDeviceRoutingModule } from './view-device-routing.module';
import { ViewDeviceComponent } from './view-device.component';


@NgModule({
  declarations: [
    ViewDeviceComponent
  ],
  imports: [
    CommonModule,
    ViewDeviceRoutingModule
  ]
})
export class ViewDeviceModule { }
