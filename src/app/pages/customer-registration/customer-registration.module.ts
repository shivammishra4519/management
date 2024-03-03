import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRegistrationRoutingModule } from './customer-registration-routing.module';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerRegistrationComponent,
  ],
  imports: [
    CommonModule,
    CustomerRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerRegistrationModule { }
