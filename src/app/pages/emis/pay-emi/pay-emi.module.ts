import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayEmiRoutingModule } from './pay-emi-routing.module';
import { PayEmiComponent } from './pay-emi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PayEmiComponent
  ],
  imports: [
    CommonModule,
    PayEmiRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PayEmiModule { }
