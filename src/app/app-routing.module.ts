import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      { path: 'sell-devices', loadChildren: () => import('./pages/sell-devices/sell-devices.module').then(m => m.SellDevicesModule) },
      { path: 'customer-registration', loadChildren: () => import('./pages/customer-registration/customer-registration.module').then(m => m.CustomerRegistrationModule) }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'customer-registraion', loadChildren: () => import('./pages/customer-registration/customer-registration.module').then(m => m.CustomerRegistrationModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
