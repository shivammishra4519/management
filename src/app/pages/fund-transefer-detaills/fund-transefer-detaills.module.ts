import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundTranseferDetaillsRoutingModule } from './fund-transefer-detaills-routing.module';
import { FundTranseferDetaillsComponent } from './fund-transefer-detaills.component';


@NgModule({
  declarations: [
    FundTranseferDetaillsComponent
  ],
  imports: [
    CommonModule,
    FundTranseferDetaillsRoutingModule
  ]
})
export class FundTranseferDetaillsModule { }
