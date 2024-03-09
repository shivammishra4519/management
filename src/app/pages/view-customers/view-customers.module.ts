import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCustomersRoutingModule } from './view-customers-routing.module';
import { ViewCustomersComponent } from './view-customers.component';


@NgModule({
  declarations: [
    ViewCustomersComponent
  ],
  imports: [
    CommonModule,
    ViewCustomersRoutingModule
  ]
})
export class ViewCustomersModule { }
