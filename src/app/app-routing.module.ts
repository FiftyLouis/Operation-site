import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IssuesComponent } from './issues/issues.component';
import { HistoricalIssuesComponent } from './historical-issues/historical-issues.component';
import { PlanningMaintenanceComponent } from './planning-maintenance/planning-maintenance.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'currentIssues', component: IssuesComponent},
    { path: 'historicalIssues', component: HistoricalIssuesComponent},
    { path: 'planningMaintenance', component: PlanningMaintenanceComponent},
    { path: '**', component: LandingPageComponent}
  ])
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
