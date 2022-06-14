import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-form-maintenance',
  templateUrl: './form-maintenance.component.html',
  styleUrls: ['./form-maintenance.component.css']
})
export class FormMaintenanceComponent implements OnInit {

  PmForm = new FormGroup({
    AffectedSolutions: new FormControl(),
    Text: new FormControl(),
    Scheduled: new FormControl(),
    duration : new FormControl(),
  })

  constructor(private data : DataService) { }

  ngOnInit(): void {
  }

  save(){
    const val = this.PmForm.value;
    console.log(val);
    this.data.CreatePm(val.AffectedSolutions, val.Text, val.Scheduled, val.duration).subscribe(data => {
      console.log(data);
    });
    window.location.href="planningMaintenance";
  }

}
