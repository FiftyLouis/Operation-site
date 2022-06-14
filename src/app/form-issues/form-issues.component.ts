import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form-issues',
  templateUrl: './form-issues.component.html',
  styleUrls: ['./form-issues.component.css']
})
export class FormIssuesComponent implements OnInit {

  IssueForm = new FormGroup({
    AffectedSolutions: new FormControl(),
    Text: new FormControl(),
    eta: new FormControl(),
  })

  constructor( private data : DataService) { }

  ngOnInit(): void {
  }

  save(){
    const val = this.IssueForm.value;
    console.log(val);
    this.data.CreateIssue(val.AffectedSolutions, val.Text, val.eta).subscribe(data => {
      console.log(data);
    });
    window.location.href="currentIssues"
  }
}
