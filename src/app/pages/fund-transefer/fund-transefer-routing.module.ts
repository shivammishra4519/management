import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundTranseferComponent } from './fund-transefer.component';

const routes: Routes = [{ path: '', component: FundTranseferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundTranseferRoutingModule { }
