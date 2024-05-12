import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CookieService } from 'ngx-cookie-service';
import { SettingComponent } from './dashboard/basic-setting/setting/setting.component';
import { BasicSettingComponent } from './dashboard/basic-setting/basic-setting/basic-setting.component';
import { SetTemplateComponent } from './dashboard/basic-setting/set-template/set-template.component';
import { SendSmsComponent } from './dashboard/basic-setting/send-sms/send-sms.component';
import { UserSettingComponent } from './dashboard/basic-setting/user-setting/user-setting.component';
import { ViewTemplatesComponent } from './dashboard/basic-setting/view-templates/view-templates.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SettingBodyComponent } from './dashboard/basic-setting/setting-body/setting-body.component';
import { DeviceSettingComponent } from './dashboard/basic-setting/device-setting/device-setting.component';
import { SmsSettingComponent } from './dashboard/basic-setting/sms-setting/sms-setting.component';
import { AddDeviceComponent } from './pages/add-device/add-device.component';
import { StockDeviceComponent } from './dashboard/basic-setting/stock-device/stock-device.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { SettleAmountComponent } from './shops/settle-amount/settle-amount.component';
import { SettleBankComponent } from './shops/settle-bank/settle-bank.component';
import { SettleAdminComponent } from './shops/settle-admin/settle-admin.component';
import { SettleEmployeeComponent } from './shops/settle-employee/settle-employee.component';
import { HomeregisterComponent } from './pages/customer-registration/homeregister/homeregister.component';
import { OtpadharComponent } from './pages/customer-registration/otpadhar/otpadhar.component';
import { NoneotpComponent } from './pages/customer-registration/noneotp/noneotp.component';
import { FindCustomerComponent } from './pages/customer-registration/find-customer/find-customer.component';
import { PaytmGatwayComponent } from './pages/paytm-gatway/paytm-gatway.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServiceComponent } from './service/service.component';
import { ProfileComponent } from './userspages/profile/profile.component';
import { WalletcheckComponent } from './popup/walletcheck/walletcheck.component';
import { MaterialModule } from './material.module';
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


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    SettingComponent,
    BasicSettingComponent,
    SetTemplateComponent,
    SendSmsComponent,
    UserSettingComponent,
    ViewTemplatesComponent,
    ForgetPasswordComponent,
    SettingBodyComponent,
    DeviceSettingComponent,
    SmsSettingComponent,
    AddDeviceComponent,
    StockDeviceComponent,
    SettleAmountComponent,
    SettleBankComponent,
    SettleAdminComponent,
    SettleEmployeeComponent,
    HomeregisterComponent,
    OtpadharComponent,
    NoneotpComponent,
    FindCustomerComponent,
    PaytmGatwayComponent,
    HomeMainComponent,
    AboutUsComponent,
    ContactUsComponent,
    ServiceComponent,
    ProfileComponent,
    WalletcheckComponent,
    GuarantorViewComponent,
    TermscondtionComponent,
    AgreementComponent,
    InstallmentslipComponent,
    GuarantorConditionComponent,
    LoanstatusComponent,
    InvoiceComponent,
    SettleCollectionComponent,
    InvoiceCustomerComponent,
    LoanstatusComponent,
    LoancaluclaterComponent,
    LoansuccessComponent,
    DownloadPdfComponent,
    EminotpaidComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
   MaterialModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    CookieService,
    provideToastr()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
