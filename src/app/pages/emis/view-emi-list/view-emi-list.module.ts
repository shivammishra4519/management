import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEmiListRoutingModule } from './view-emi-list-routing.module';
import { ViewEmiListComponent } from './view-emi-list.component';


@NgModule({
  declarations: [
    ViewEmiListComponent
  ],
  imports: [
    CommonModule,
    ViewEmiListRoutingModule
  ]
})
export class ViewEmiListModule { }
