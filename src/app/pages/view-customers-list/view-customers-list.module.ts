import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCustomersListRoutingModule } from './view-customers-list-routing.module';
import { ViewCustomersListComponent } from './view-customers-list.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    ViewCustomersListComponent
  ],
  imports: [
    CommonModule,
    ViewCustomersListRoutingModule,
    MaterialModule,
    
  ]
})
export class ViewCustomersListModule { }
