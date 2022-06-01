import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';


interface PM{
id:number
dateofCreation:string;
scheduled: string;
affectedSolutions: string;
text: string;
duration : string;
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
  this.dataService.GetPmScheduledDate().subscribe((data : PM[])=> {
    this.PlannedMaintenance = data.filter(element => {
      var d1 = new Date(element.scheduled);
      var d2 = new Date(Date.now());
      var result = d1.valueOf() - d2.valueOf();
      var h = Math.floor(result/(1000*60*60));
      return h < int
    });
  });
 }

 All(){
  this.dataService.GetPmScheduledDate().subscribe((data : PM[])=> {
    data.forEach( element => {
      element.scheduled = this.reformateDate(element.scheduled);
      element.dateofCreation = this.reformateDate(element.dateofCreation);
    })
    this.PlannedMaintenance = data;
  })
 }


durationTime(scheduled: string):string{
    var d1 = new Date(scheduled);
    var d2 = new Date(Date.now());
    var result = d1.valueOf() - d2.valueOf();
    var h = result/(1000*60*60);
    var min = h - Math.floor(result/(1000*60*60));
    return Math.floor(h) + " h " + Math.floor(min*60) + " min"; 
}

reformateDate(s: string): string{
  var date = s.split('T')[0];
  var time = s.split('T')[1];
  date = date.split('-').reverse().join('/');

  var  hour = time.split(':')[0];
  var minute = time.split(':')[1];
  const t = [hour, minute];
  time = t.join(':');

  const element = [date, time];
  return element.join(' ');
}
}
