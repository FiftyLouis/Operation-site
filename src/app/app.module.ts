import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlanningMaintenanceComponent } from './planning-maintenance/planning-maintenance.component';
import { HistoricalIssuesComponent } from './historical-issues/historical-issues.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './Interceptor';
import { HistoricalMaintenanceComponent } from './historical-maintenance/historical-maintenance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopLoginComponent } from './pop-login/pop-login.component';
import { FormIssuesComponent } from './form-issues/form-issues.component';
import { FormMaintenanceComponent } from './form-maintenance/form-maintenance.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    HeaderComponent,
    FooterComponent,
    PlanningMaintenanceComponent,
    HistoricalIssuesComponent,
    LandingPageComponent,
    LoginComponent,
    HistoricalMaintenanceComponent,
    PopLoginComponent,
    FormIssuesComponent,
    FormMaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
