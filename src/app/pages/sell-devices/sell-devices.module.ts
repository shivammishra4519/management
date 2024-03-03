import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellDevicesRoutingModule } from './sell-devices-routing.module';
import { SellDevicesComponent } from './sell-devices.component';


@NgModule({
  declarations: [
    SellDevicesComponent
  ],
  imports: [
    CommonModule,
    SellDevicesRoutingModule
  ]
})
export class SellDevicesModule { }
