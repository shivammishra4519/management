import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      { path: 'sell-devices/:number', loadChildren: () => import('./pages/sell-devices/sell-devices.module').then(m => m.SellDevicesModule) },
      { path: 'customer-registration', loadChildren: () => import('./pages/customer-registration/customer-registration.module').then(m => m.CustomerRegistrationModule) },
      { path: 'user-registration', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
      { path: 'add-device', loadChildren: () => import('./pages/add-device/add-device.module').then(m => m.AddDeviceModule) },
      { path: 'view-users', loadChildren: () => import('./pages/view-users/view-users.module').then(m => m.ViewUsersModule) },
      { path: 'view-customers', loadChildren: () => import('./pages/view-customers/view-customers.module').then(m => m.ViewCustomersModule) },
      { path: 'view-customers-list', loadChildren: () => import('./pages/view-customers-list/view-customers-list.module').then(m => m.ViewCustomersListModule) },
      { path: 'view-sell-device', loadChildren: () => import('./pages/view-sell-device/view-sell-device.module').then(m => m.ViewSellDeviceModule) },
      { path: 'view-emi', loadChildren: () => import('./pages/emis/view-emi/view-emi.module').then(m => m.ViewEmiModule) },
      { path: 'pay-emi', loadChildren: () => import('./pages/emis/pay-emi/pay-emi.module').then(m => m.PayEmiModule) },
      { path: 'view-emi-list', loadChildren: () => import('./pages/emis/view-emi-list/view-emi-list.module').then(m => m.ViewEmiListModule) },
      { path: 'employe-register', loadChildren: () => import('./pages/employe-register/employe-register.module').then(m => m.EmployeRegisterModule) },
      { path: 'fund-transefer', loadChildren: () => import('./pages/fund-transefer/fund-transefer.module').then(m => m.FundTranseferModule) },
      { path: 'fund-transfe-details', loadChildren: () => import('./pages/fund-transefer-detaills/fund-transefer-detaills.module').then(m => m.FundTranseferDetaillsModule) },
      { path: 'users-list', loadChildren: () => import('./pages/users-lis/users-lis.module').then(m => m.UsersLisModule) }
    
     
      
    ],
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
 
 

  

  
  
 
 
  
  
  // { path: 'customer-registraion', loadChildren: () => import('./pages/customer-registration/customer-registration.module').then(m => m.CustomerRegistrationModule) },
  // { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
