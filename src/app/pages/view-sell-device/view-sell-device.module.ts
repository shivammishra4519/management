import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSellDeviceRoutingModule } from './view-sell-device-routing.module';
import { ViewSellDeviceComponent } from './view-sell-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ViewSellDeviceComponent
  ],
  imports: [
    CommonModule,
    ViewSellDeviceRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ]
})
export class ViewSellDeviceModule { }
