import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmiListComponent } from './view-emi-list.component';

const routes: Routes = [{ path: '', component: ViewEmiListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewEmiListRoutingModule { }
