import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

interface PM{
id:number
dateofCreation:string;
scheduled: string;
affectedSolutions: string;
text: string;
}

@Component({
  selector: 'app-planning-maintenance',
  templateUrl: './planning-maintenance.component.html',
  styleUrls: ['./planning-maintenance.component.css']
})

export class PlanningMaintenanceComponent implements OnInit {

  modalRef!: BsModalRef;
  login : any;
  idRmv!: number;

  barChartData: ChartDataset[] | undefined;
  public barChartOptions: ChartOptions = {
    responsive: true,
    backgroundColor: 'blue',
  };
  public barChartLabels  = ['1 day', '7 days', '30 days', 'more'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private dataService : DataService, private modalService : BsModalService) { }

  PlannedMaintenance: PM[] = [];

  ngOnInit(): void {
    this.dataService.GetPmScheduledDate().subscribe((data: PM[]) =>{
      console.log(data);
      data.forEach(element => {
        element.dateofCreation = element.dateofCreation.split("T")[0];
        element.scheduled = element.scheduled.split("T")[0];
      })
      this.PlannedMaintenance = data;
    })
    if(localStorage.key(0)){
      this.login = true;
      this.dataService.GetChartPm().subscribe( data => {
        console.log(data);
        this.barChartData = [{ data: data, label:'Schedulled'}];
      })
    }else{
      this.login = false
    }
  }

  remove(){
    this.dataService.DeletePmAdmin(this.idRmv).subscribe((data : PM) => {
      console.log(data);
    });
    window.location.href="http://localhost:4200/planningMaintenance"
  }

  openModal(template: TemplateRef<any>, id : number) {
    this.idRmv = id;
    this.modalRef = this.modalService.show(template);
 }
 

 TodayPm(){
  //TODO
 }

 WeekPm(){
  //TODO
 }

 MonthPm(){
  //TODO
 }

 All(){
   //TODO
 }



}
