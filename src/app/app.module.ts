import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlanningMaintenanceComponent } from './planning-maintenance/planning-maintenance.component';
import { HistoricalIssuesComponent } from './historical-issues/historical-issues.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    HeaderComponent,
    FooterComponent,
    PlanningMaintenanceComponent,
    HistoricalIssuesComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
