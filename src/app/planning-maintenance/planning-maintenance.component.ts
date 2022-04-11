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
  selector: 'app-planning-maintenance',
  templateUrl: './planning-maintenance.component.html',
  styleUrls: ['./planning-maintenance.component.css']
})

export class PlanningMaintenanceComponent implements OnInit {

  constructor(private dataService : DataService) { }

  PlannedMaintenance: PM[] = [];

  ngOnInit(): void {
    this.dataService.GetPmScheduledDate().subscribe((data: PM[]) =>{
      console.log(data);
      this.PlannedMaintenance = data;
    })
  }

}
