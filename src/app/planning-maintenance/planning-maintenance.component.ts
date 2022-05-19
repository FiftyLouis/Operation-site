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
  public barChartPlugins: any = [];

  constructor(private dataService : DataService, private modalService : BsModalService) { }

  PlannedMaintenance: PM[] = [];

  ngOnInit(): void {
    this.All();
    if(localStorage.key(0)){
      this.login = true;
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
 

 TodayPm(int:number){
  var date = new Date();
  date.setDate(date.getDate()-int);
  this.dataService.GetPmScheduledDate().subscribe((data : PM[])=> {
    this.PlannedMaintenance = data.filter(element => Date.parse(element.dateofCreation).valueOf() >= date.valueOf());
    this.setChartPm();
  });
 }

 All(){
  this.dataService.GetPmScheduledDate().subscribe((data : PM[])=> {
    this.PlannedMaintenance = data;
    this.setChartPm();
  })
 }

 setChartPm(){
  let data: number[] = [0,0,0,0,];
  this.PlannedMaintenance.forEach(element => {
   var d = Date.parse(element.scheduled);
   var day = new Date();
   day.setDate(day.getDate()+1);
   var week = new Date();
   week.setDate(week.getDate()+7);
   var month = new Date();
   month.setDate(month.getDate()+30);
   if(d.valueOf() <= day.valueOf()){
     data[0]++;
   }
   else if(d.valueOf() <= week.valueOf()){
     data[1]++;
   }
   else if(d.valueOf() <= month.valueOf()){
     data[2]++;
   }
   else{
     data[3]++;
   }
  });
  this.barChartData = [{ data : data, label: 'Scheduled Time'}];
}

}
