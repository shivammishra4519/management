import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUsersRoutingModule } from './view-users-routing.module';
import { ViewUsersComponent } from './view-users.component';


@NgModule({
  declarations: [
    ViewUsersComponent
  ],
  imports: [
    CommonModule,
    ViewUsersRoutingModule
  ]
})
export class ViewUsersModule { }
