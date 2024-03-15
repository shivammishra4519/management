import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundTranseferDetaillsComponent } from './fund-transefer-detaills.component';

const routes: Routes = [{ path: '', component: FundTranseferDetaillsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundTranseferDetaillsRoutingModule { }
