import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { AuthServiceService } from '../auth-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

interface issues{
  id: number;
  date: string;
  affectedSolutions: string;
  text: string;
  eta: string;
  solving: string;
  closing: string;
}

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  currentIssues: issues[] = [];
  login : any;
  modalRef!: BsModalRef;
  idSolved!: number;

  DateForm = new FormGroup({
    date: new FormControl(),
  })


  barChartData: ChartDataset[] | undefined;
  public barChartOptions: ChartOptions = {
    responsive: true,
    backgroundColor: 'blue',
  };
  public barChartLabels  = ['1 day', '7 days', '30 days', 'more'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private dataService : DataService, private auth : AuthServiceService, private modalService : BsModalService ) { }

  ngOnInit(): void {
    this.All();
    if(localStorage.key(0)){
      this.login = true;
    }else{
      this.login = false
    }
  }

  solving(){
    const val = this.DateForm.value;
    this.dataService.SolvedIssue(this.idSolved, val.date).subscribe( (data : issues) => {
      console.log(data);
    });
    window.location.href="http://localhost:4200/currentIssues"
  }

  openModal(template: TemplateRef<any>, id : number) {
    this.idSolved = id;
    this.modalRef = this.modalService.show(template);
 }

 TodayIssue(int:number){
  this.dataService.GetCurrentIssues().subscribe((data: issues[]) => {
    var date = new Date()
    date.setDate(date.getDate()-int);
    data.forEach( element => {
      element.date = element.date.split("T")[0];
      element.eta = element.eta.split("T")[0];
    })
    this.currentIssues = data.filter(element => Date.parse(element.date).valueOf() >= date.valueOf());
  });
  this.setDataChart();
 }

 All(){
  this.dataService.GetCurrentIssues().subscribe((data: issues[]) => {
    console.log(data);
    data.forEach( element => {
      element.date = element.date.split("T")[0];
      element.eta = element.eta.split("T")[0];
    })
    this.currentIssues = data;
  });
  this.setDataChart();
 }

 setDataChart(){
  let data: number[] = [0, 0, 0, 0];
  this.currentIssues.forEach(element => {
    var d = Date.parse(element.eta);
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
  this.barChartData = [{ data : data, label: 'Estimated Time of Arrival'}];
}
}
