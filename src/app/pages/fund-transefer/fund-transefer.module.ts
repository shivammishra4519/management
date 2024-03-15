import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundTranseferRoutingModule } from './fund-transefer-routing.module';
import { FundTranseferComponent } from './fund-transefer.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FundTranseferComponent
  ],
  imports: [
    CommonModule,
    FundTranseferRoutingModule,
    ReactiveFormsModule
  ]
})
export class FundTranseferModule { }
