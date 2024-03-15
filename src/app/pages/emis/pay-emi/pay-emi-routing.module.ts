import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayEmiComponent } from './pay-emi.component';

const routes: Routes = [{ path: '', component: PayEmiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayEmiRoutingModule { }
