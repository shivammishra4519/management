import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmiComponent } from './view-emi.component';

const routes: Routes = [{ path: '', component: ViewEmiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewEmiRoutingModule { }
