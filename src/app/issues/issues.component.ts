import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { AuthServiceService } from '../auth-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';


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
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  currentIssues: issues[] = [];
  login : any;
  modalRef!: BsModalRef;
  idSolved!: number;

  DateForm = new FormGroup({
    date: new FormControl(),
  })

  constructor(private dataService : DataService, private auth : AuthServiceService, private modalService : BsModalService ) { }

  ngOnInit(): void {
    this.dataService.GetCurrentIssues().subscribe((data: issues[]) => {
      console.log(data);
      this.currentIssues = data;
    })
    console.log(this.login)
    if(localStorage.key(0)){
      this.login = true;
    }else{
      this.login = false
    }
  }

  solving(){
    const val = this.DateForm.value;
    this.dataService.SolvedIssue(this.idSolved, val.date).subscribe( (data : issues) => {
      console.log(data);
    });
    window.location.href="http://localhost:4200/currentIssues"
  }

  openModal(template: TemplateRef<any>, id : number) {
    this.idSolved = id;
    this.modalRef = this.modalService.show(template);
 }



}
