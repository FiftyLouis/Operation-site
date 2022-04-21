import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  nbIssue! : number;
  nbHi! : number;
  nbPm! : number;


  constructor(private dataService : DataService) {}

  ngOnInit(): void {
    this.nbIssues();
    this.nbHistorical();
    this.nbPlanned();
  }


  nbIssues(){
    this.dataService.GetCurrentIssues()
      .subscribe(data => {
        this.nbIssue = data.length;
      })
  }
  nbHistorical(){
    this.dataService.GetHistoricalIssues()
      .subscribe(data => {
        this.nbHi = data.length;
      })
  }
  nbPlanned(){
    this.dataService.GetPmScheduledDate()
      .subscribe(data => {
        this.nbPm = data.length;
      })
  }

}
