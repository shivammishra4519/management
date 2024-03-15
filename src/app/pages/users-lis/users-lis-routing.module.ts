import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersLisComponent } from './users-lis.component';

const routes: Routes = [{ path: '', component: UsersLisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersLisRoutingModule { }
