import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';


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
  selector: 'app-detail-issue',
  templateUrl: './detail-issue.component.html',
  styleUrls: ['./detail-issue.component.css']
})
export class DetailIssueComponent implements OnInit {

  issues: issues;
  id : number;
  login : any;

  modalRef : BsModalRef;

  inputForm = new FormGroup({
    input: new FormControl(),

  })

  constructor(private dataService: DataService, private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var p = params.get("id");
      if(!isNaN(Number(p))){
        this.id = Number(p);
      }else {
        console.log("not a number !");
      }
    });
    this.dataService.GetIssues(this.id).subscribe( data => {
      console.log(data);
      this.issues = data.value;
      this.issues.eta = this.reformatDate(this.issues.eta);
      this.issues.date = this.reformatDate(this.issues.date);
    })
    if(localStorage.key(0)){
      this.login = true;
    }else{
      this.login = false;
    }
  }

  reformatDate(s : string){
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

  editTextIssue(){
    console.log(this.inputForm.value);
    const val = this.inputForm.value;
    this.dataService.editTextIssue(this.id, val.input).subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

  editSolutionIssue(){
    const val = this.inputForm.value;
    this.dataService.editSolutionIssue(this.id, val.input).subscribe( data => {
      console.log(data);
    });
    window.location.reload();
  }

  editEtaIssue(){
    const val = this.inputForm.value;
    this.dataService.editEtaIssue(this.id, val.input).subscribe( data => {
      console.log(data);
    });
    window.location.reload();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

 deleteIssue(){
  this.dataService.DeleteIssues(this.id).subscribe( data => {
    console.log(data);
  });
  window.location.href="http://localhost:4200/currentIssues";
 }

}
