import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { SettingComponent } from './dashboard/basic-setting/setting/setting.component';
import { BasicSettingComponent } from './dashboard/basic-setting/basic-setting/basic-setting.component';
import { SetTemplateComponent } from './dashboard/basic-setting/set-template/set-template.component';
import { employeeAuthGuard } from './employee-auth.guard';
import { adminAuthGaurdGuard } from './admin-auth-gaurd.guard';
import { SendSmsComponent } from './dashboard/basic-setting/send-sms/send-sms.component';
import { UserSettingComponent } from './dashboard/basic-setting/user-setting/user-setting.component';
import { userAuthGaurdGuard } from './user-auth-gaurd.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SettingBodyComponent } from './dashboard/basic-setting/setting-body/setting-body.component';
import { DeviceSettingComponent } from './dashboard/basic-setting/device-setting/device-setting.component';
import { SmsSettingComponent } from './dashboard/basic-setting/sms-setting/sms-setting.component';
import { authGuard } from './auth.guard';
import { SettleAmountComponent } from './shops/settle-amount/settle-amount.component';
import { SettleBankComponent } from './shops/settle-bank/settle-bank.component';
import { SettleAdminComponent } from './shops/settle-admin/settle-admin.component';
import { SettleEmployeeComponent } from './shops/settle-employee/settle-employee.component';
// import { ViewTemplatesComponent } from './dashboard/basic-setting/view-templates/view-templates.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      { path: 'sell-devices/:number', loadChildren: () => import('./pages/sell-devices/sell-devices.module').then(m => m.SellDevicesModule), },
      { path: 'customer-registration', loadChildren: () => import('./pages/customer-registration/customer-registration.module').then(m => m.CustomerRegistrationModule) },
      { path: 'user-registration', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [adminAuthGaurdGuard] },
      { path: 'view-users', loadChildren: () => import('./pages/view-users/view-users.module').then(m => m.ViewUsersModule) },
      { path: 'view-customers', loadChildren: () => import('./pages/view-customers/view-customers.module').then(m => m.ViewCustomersModule) },
      { path: 'view-customers-list', loadChildren: () => import('./pages/view-customers-list/view-customers-list.module').then(m => m.ViewCustomersListModule) },
      { path: 'view-sell-device', loadChildren: () => import('./pages/view-sell-device/view-sell-device.module').then(m => m.ViewSellDeviceModule) },
      { path: 'view-emi', loadChildren: () => import('./pages/emis/view-emi/view-emi.module').then(m => m.ViewEmiModule) },
      { path: 'pay-emi', loadChildren: () => import('./pages/emis/pay-emi/pay-emi.module').then(m => m.PayEmiModule), },
      { path: 'view-emi-list', loadChildren: () => import('./pages/emis/view-emi-list/view-emi-list.module').then(m => m.ViewEmiListModule) },
      { path: 'employe-register', loadChildren: () => import('./pages/employe-register/employe-register.module').then(m => m.EmployeRegisterModule), canActivate: [adminAuthGaurdGuard] },
      { path: 'fund-transefer', loadChildren: () => import('./pages/fund-transefer/fund-transefer.module').then(m => m.FundTranseferModule), canActivate: [adminAuthGaurdGuard] },
      { path: 'fund-transfe-details', loadChildren: () => import('./pages/fund-transefer-detaills/fund-transefer-detaills.module').then(m => m.FundTranseferDetaillsModule) },
      { path: 'users-list', loadChildren: () => import('./pages/users-lis/users-lis.module').then(m => m.UsersLisModule), canActivate: [adminAuthGaurdGuard] },
      { path: 'settle-amount', component: SettleAmountComponent, },
      { path: 'bank', component: SettleBankComponent },
      {path:'admin',component:SettleAdminComponent},
      {path:'employee',component:SettleEmployeeComponent},
      {
        path: 'setting', component: SettingComponent,
        children: [
          { path: 'basic-setting', component: BasicSettingComponent },
          { path: 'set-template', component: SetTemplateComponent },
          { path: 'send-sms', component: SendSmsComponent },
          { path: 'sms-setting', component: SmsSettingComponent },
          // {path:'view-template',component:ViewTemplatesComponent},
        ],
        canActivate: [adminAuthGaurdGuard]
      },
      {
        path: 'user-setting', component: UserSettingComponent,
        children: [
          { path: 'home', component: SettingBodyComponent },
          { path: 'manage-device', component: DeviceSettingComponent },
          { path: 'settings', component: SettingBodyComponent }
        ]
      },





    ],
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
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
