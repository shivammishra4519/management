import { Component, NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
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
import { HomeregisterComponent } from './pages/customer-registration/homeregister/homeregister.component';
import { NoneotpComponent } from './pages/customer-registration/noneotp/noneotp.component';
import { OtpadharComponent } from './pages/customer-registration/otpadhar/otpadhar.component';
import { FindCustomerComponent } from './pages/customer-registration/find-customer/find-customer.component';
import { PaytmGatwayComponent } from './pages/paytm-gatway/paytm-gatway.component';
import { GuarantorComponent } from './pages/guarantor/guarantor.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProfileComponent } from './userspages/profile/profile.component';
import { GuarantorViewComponent } from './pages/guarantor-view/guarantor-view.component';
import { TermscondtionComponent } from './pdfs/termscondtion/termscondtion.component';
import { AgreementComponent } from './pdfs/agreement/agreement.component';
import { InstallmentslipComponent } from './pdfs/installmentslip/installmentslip.component';
import { GuarantorConditionComponent } from './pdfs/guarantor-condition/guarantor-condition.component';
import { LoanstatusComponent } from './pages/loanstatus/loanstatus.component';
import { InvoiceComponent } from './pdfs/invoice/invoice.component';
import { SettleCollectionComponent } from './admin/settle-collection/settle-collection.component';
import { InvoiceCustomerComponent } from './pdfs/invoice-customer/invoice-customer.component';
import { LoancaluclaterComponent } from './pages/loancaluclater/loancaluclater.component';
import { LoansuccessComponent } from './pages/loansuccess/loansuccess.component';
import { DownloadPdfComponent } from './pages/download-pdf/download-pdf.component';
import { EminotpaidComponent } from './pages/eminotpaid/eminotpaid.component';
import { CustomerHomeComponent } from './pages/customer-home/customer-home.component';
import { AppViewComponent } from './pages/app-view/app-view.component';
import { HomeAppComponent } from './customer-pages/home-app/home-app.component';
import { ViewemiAdminComponent } from './pages/viewemi-admin/viewemi-admin.component';
import { SerchloanComponent } from './pages/serchloan/serchloan.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { OnlinepyamnetrequestComponent } from './pages/onlinepyamnetrequest/onlinepyamnetrequest.component';
import { HomeAppliancesComponent } from './dashboard/basic-setting/home-appliances/home-appliances.component';
import { SellProductComponent } from './pages/sell-product/sell-product.component';
import { AggrementHomeApplinceComponent } from './pdfs/aggrement-home-applince/aggrement-home-applince.component';
import { HomeApplincesSuccessComponent } from './pages/home-applinces-success/home-applinces-success.component';
import { InvoiceHomeApplincesCompanyComponent } from './pdfs/invoice-home-applinces-company/invoice-home-applinces-company.component';
// import { ViewTemplatesComponent } from './dashboard/basic-setting/view-templates/view-templates.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'gaurantor', component: GuarantorComponent },
      { path: 'loan-calculater', component: LoancaluclaterComponent },
      { path: 'loan-success', component: LoansuccessComponent },
      { path: 'appliances-success', component: HomeApplincesSuccessComponent },
      { path: 'view-gaurantor', component: GuarantorViewComponent },
      { path: 'pdf', component: DownloadPdfComponent },
      { path: 'emi-notpaid', component: EminotpaidComponent },
      { path: 'customer-home', component: CustomerHomeComponent },
      { path: 'online-request', component: OnlinepyamnetrequestComponent },
      { path: 'viewpaidemi-admin', component: ViewemiAdminComponent },
      { path: 'sell-product', component: SellProductComponent },
      { path: 'sell-device', loadChildren: () => import('./pages/sell-devices/sell-devices.module').then(m => m.SellDevicesModule), },
      {
        path: 'customer-registration', component: HomeregisterComponent,
        children: [
          { path: 'manual', component: NoneotpComponent },
          { path: 'byadhar', component: OtpadharComponent },
          { path: 'find-customer', component: FindCustomerComponent },
        ]
      },
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
      {
        path: 'settle-amount', component: SettleAmountComponent,
        children: [
          { path: 'bank', component: SettleBankComponent },
          { path: 'admin', component: SettleAdminComponent },
          { path: 'employee', component: SettleEmployeeComponent },
        ]
      },

      { path: 'guarantor', component: GuarantorComponent },
      { path: 'settle-collection', component: SettleCollectionComponent, canActivate: [adminAuthGaurdGuard] },


      {
        path: 'setting', component: SettingComponent,
        children: [
          { path: 'basic-setting', component: BasicSettingComponent },
          { path: 'set-template', component: SetTemplateComponent },
          { path: 'send-sms', component: SendSmsComponent },
          { path: 'sms-setting', component: SmsSettingComponent },
        ],
        canActivate: [adminAuthGaurdGuard]
      },
      {
        path: 'user-setting', component: UserSettingComponent,
        children: [
          { path: 'home', component: SettingBodyComponent },
          { path: 'manage-device', component: DeviceSettingComponent },
          { path: 'settings', component: SettingBodyComponent },
          { path: 'home-appliances', component: HomeAppliancesComponent },
        ],
        canActivate: [adminAuthGaurdGuard]
      },
      { path: 'loan-status', component: LoanstatusComponent }
    ],
    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'search-loan', component: SerchloanComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'home', component: HomeMainComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'payment', component: PaytmGatwayComponent },
  { path: 'terms-condtiton', component: TermscondtionComponent },
  { path: 'guarantor-condtiton', component: GuarantorConditionComponent },
  { path: 'aggrement', component: AgreementComponent },
  { path: 'aggrement-homeapplinaces', component: AggrementHomeApplinceComponent },
  { path: 'installment-slip', component: InstallmentslipComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'invoice-customer', component: InvoiceCustomerComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'invoice-homeappliance', component: InvoiceHomeApplincesCompanyComponent },
  

  {
    path: 'app',
    component: AppViewComponent,
    children: [
      { path: '', redirectTo: 'customer', pathMatch: 'full' }, // Redirect default child route
      { path: 'customer', component: HomeAppComponent },
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
