import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeRegisterComponent } from './employe-register.component';

const routes: Routes = [{ path: '', component: EmployeRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeRegisterRoutingModule { }
