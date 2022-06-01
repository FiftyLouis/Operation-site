import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface PM{
  id:number
  dateofCreation:string;
  scheduled: string;
  affectedSolutions: string;
  text: string;
  duration:string;
  }

@Component({
  selector: 'app-historical-maintenance',
  templateUrl: './historical-maintenance.component.html',
  styleUrls: ['./historical-maintenance.component.css']
})
export class HistoricalMaintenanceComponent implements OnInit {

  PlannedMaintenance: PM[] = [];

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.GetHistoricalPmAdmin().subscribe((data: PM[]) =>{
      console.log(data);
      data.forEach( element => {
        element.dateofCreation = this.reformateDate(element.dateofCreation);
        element.scheduled = this.reformateDate(element.scheduled);
      })
      this.PlannedMaintenance = data;
    })
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
