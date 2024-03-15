import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSellDeviceComponent } from './view-sell-device.component';

const routes: Routes = [{ path: '', component: ViewSellDeviceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSellDeviceRoutingModule { }
