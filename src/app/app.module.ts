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
    SettleEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,NoopAnimationsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
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
