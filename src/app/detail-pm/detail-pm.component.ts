import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

interface PM{
  id:number
  dateofCreation:string;
  scheduled: string;
  affectedSolutions: string;
  text: string;
  duration : string;
  }
@Component({
  selector: 'app-detail-pm',
  templateUrl: './detail-pm.component.html',
  styleUrls: ['./detail-pm.component.css']
})
export class DetailPmComponent implements OnInit {

  id : number;
  PM : PM;
  login : any;


  modalRef : BsModalRef;

  inputForm = new FormGroup({
    input: new FormControl(),

  })

  constructor(private dataService: DataService, private router: ActivatedRoute, private modalService: BsModalService) { }


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
    var p = params.get("id");
    if(!isNaN(Number(p))){
      this.id = Number(p);
    }else {
      console.log("not a number");
    }
    });
    this.dataService.GetPm(this.id).subscribe(data => {
      console.log(data);
      this.PM = data.value;
      this.PM.scheduled = this.reformatDate(this.PM.scheduled);
      this.PM.dateofCreation = this.reformatDate(this.PM.dateofCreation);
    });
    if(localStorage.key(0)){
      this.login = true;
    }else{
      this.login = false
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

  editTextPm(){
    const val = this.inputForm.value;
    this.dataService.editTextPm(this.id, val.input).subscribe( data => {
      console.log(data);
    });
    window.location.reload();
  }

  editSolutionPm(){
    const val = this.inputForm.value;
    this.dataService.editSolutionPm(this.id, val.input).subscribe( data => {
      console.log(data);
    });
    window.location.reload();
  }

  editScheduledPm(){
    const val = this.inputForm.value;
    this.dataService.editScheduledPm(this.id, val.input).subscribe( data => {
      console.log(data);
    });
    window.location.reload();
  }

  reformatDate(s : string): string{
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

  deletePM(){
    this.dataService.DeletePmAdmin(this.id).subscribe( data => {
      console.log(data);
    });
    window.location.href="http://localhost:4200/planningMaintenance";
  }
}
