import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCustomersListComponent } from './view-customers-list.component';

const routes: Routes = [{ path: '', component: ViewCustomersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCustomersListRoutingModule { }
