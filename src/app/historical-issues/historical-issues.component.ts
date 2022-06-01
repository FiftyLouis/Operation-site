import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

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
  selector: 'app-historical-issues',
  templateUrl: './historical-issues.component.html',
  styleUrls: ['./historical-issues.component.css']
})
export class HistoricalIssuesComponent implements OnInit {
  HistoricalIssues: issues[] = [];

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.GetHistoricalIssues().subscribe((data: issues[]) => {
      console.log(data);
      data.forEach(element => {
        element.date = this.reformateDate(element.date);
        element.eta = this.reformateDate(element.eta);
        element.closing = this.reformateDate(element.closing);
        element.solving = this.reformateDate(element.solving);
      })
      this.HistoricalIssues = data;
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
