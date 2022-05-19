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
      this.HistoricalIssues = data;
    })
  }
}
