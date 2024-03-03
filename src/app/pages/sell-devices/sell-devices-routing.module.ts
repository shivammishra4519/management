import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellDevicesComponent } from './sell-devices.component';

const routes: Routes = [{ path: '', component: SellDevicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellDevicesRoutingModule { }
