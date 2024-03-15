import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersLisRoutingModule } from './users-lis-routing.module';
import { UsersLisComponent } from './users-lis.component';


@NgModule({
  declarations: [
    UsersLisComponent
  ],
  imports: [
    CommonModule,
    UsersLisRoutingModule
  ]
})
export class UsersLisModule { }
