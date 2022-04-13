import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface PM{
  id:number
  dateofCreation:string;
  scheduled: string;
  affectedSolutions: string;
  text: string;
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
      this.PlannedMaintenance = data;
    })
  }

}
