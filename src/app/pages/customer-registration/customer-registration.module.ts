import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRegistrationRoutingModule } from './customer-registration-routing.module';
import { CustomerRegistrationComponent } from './customer-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    CustomerRegistrationComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    CustomerRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerRegistrationModule { }
