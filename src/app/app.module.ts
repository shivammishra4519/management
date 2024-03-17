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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CookieService } from 'ngx-cookie-service';
import { SettingComponent } from './dashboard/basic-setting/setting/setting.component';
import { BasicSettingComponent } from './dashboard/basic-setting/basic-setting/basic-setting.component';
import { SetTemplateComponent } from './dashboard/basic-setting/set-template/set-template.component';
import { SendSmsComponent } from './dashboard/basic-setting/send-sms/send-sms.component';
import { UserSettingComponent } from './dashboard/basic-setting/user-setting/user-setting.component';
import { ViewTemplatesComponent } from './dashboard/basic-setting/view-templates/view-templates.component';

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
    ViewTemplatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,NoopAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
