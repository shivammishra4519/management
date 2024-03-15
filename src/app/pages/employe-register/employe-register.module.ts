import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeRegisterRoutingModule } from './employe-register-routing.module';
import { EmployeRegisterComponent } from './employe-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeRegisterComponent
  ],
  imports: [
    CommonModule,
    EmployeRegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeRegisterModule { }
