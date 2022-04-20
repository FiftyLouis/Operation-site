import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field'
import { MatFormFieldAppearance } from '@angular/material/form-field';

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
  })

  constructor(private data : DataService) { }

  ngOnInit(): void {
  }

  save(){
    const val = this.PmForm.value;
    console.log(val);
    this.data.CreatePm(val.AffectedSolutions, val.Text, val.Scheduled).subscribe(data => {
      console.log(data);
    });
    window.location.href="http://localhost:4200/planningMaintenance";
  }

}
