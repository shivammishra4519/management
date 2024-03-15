import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEmiRoutingModule } from './view-emi-routing.module';
import { ViewEmiComponent } from './view-emi.component';


@NgModule({
  declarations: [
    ViewEmiComponent
  ],
  imports: [
    CommonModule,
    ViewEmiRoutingModule
  ]
})
export class ViewEmiModule { }
