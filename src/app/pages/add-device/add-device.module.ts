import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDeviceRoutingModule } from './add-device-routing.module';
import { AddDeviceComponent } from './add-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    AddDeviceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddDeviceModule { }
