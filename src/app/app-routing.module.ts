import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IssuesComponent } from './issues/issues.component';
import { HistoricalIssuesComponent } from './historical-issues/historical-issues.component';
import { PlanningMaintenanceComponent } from './planning-maintenance/planning-maintenance.component';
import { LoginComponent } from './login/login.component';
import { HistoricalMaintenanceComponent } from './historical-maintenance/historical-maintenance.component';
import { FormIssuesComponent } from './form-issues/form-issues.component';
import { FormMaintenanceComponent } from './form-maintenance/form-maintenance.component';
import { DetailIssueComponent } from './detail-issue/detail-issue.component';
import { DetailPmComponent } from './detail-pm/detail-pm.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'currentIssues', component: IssuesComponent},
    { path: 'historicalIssues', component: HistoricalIssuesComponent},
    { path: 'planningMaintenance', component: PlanningMaintenanceComponent},
    { path: 'login', component: LoginComponent},
    { path: 'historicalMaintenance', component: HistoricalMaintenanceComponent},
    { path: 'currentIssues/formIssue', component: FormIssuesComponent},
    { path: 'planningMaintenance/formMaintenance', component : FormMaintenanceComponent},
    { path: 'detailIssue', component: DetailIssueComponent},
    { path: 'detailPm', component: DetailPmComponent},
    { path: '**', component: LandingPageComponent},
  ])
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
