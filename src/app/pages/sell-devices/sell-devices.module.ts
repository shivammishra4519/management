import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellDevicesRoutingModule } from './sell-devices-routing.module';
import { SellDevicesComponent } from './sell-devices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SellDevicesComponent
  ],
  imports: [
    CommonModule,
    SellDevicesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SellDevicesModule { }
