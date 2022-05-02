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
      data.forEach((element : issues) => {
        element.date = this.reformatDate(element.date.split('T')[0]);
        element.eta = this.reformatDate(element.eta.split('T')[0]);
        element.solving = this.reformatDate(element.solving.split('T')[0]);
        element.closing = this.reformatDate(element.closing.split('T')[0]);
      })
      this.HistoricalIssues = data;
    })
  }

  reformatDate(s : string){
    const result = s.split('-').reverse();
    return result.join('/');
  }
}
