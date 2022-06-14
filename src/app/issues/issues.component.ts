import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { AuthServiceService } from '../auth-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';


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
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent implements OnInit {

  currentIssues: issues[] = [];
  login : any;
  modalRef!: BsModalRef;
  idSolved!: number;
  searchText = '';
  toggleSearch:boolean = false;
  @ViewChild('searchBar') searchbar: ElementRef;

  DateForm = new FormGroup({
    date: new FormControl(),
  })


  constructor(private dataService : DataService, private auth : AuthServiceService, private modalService : BsModalService ) { }

  ngOnInit(): void {
    this.All();
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
    window.location.href="currentIssues";
  }

  openModal(template: TemplateRef<any>, id : number) {
    this.idSolved = id;
    this.modalRef = this.modalService.show(template);
 }

 Added(int:number){
   //get data
  this.dataService.GetCurrentIssues().subscribe((data: issues[]) => {
    var date = new Date().setHours(new Date().getHours()-int);
    console.log(date);
    data = data.filter(element => Date.parse(element.date).valueOf() >= date.valueOf());
    data.forEach( element => {
      element.date = this.reformateDate(element.date);
      element.eta = this.reformateDate(element.eta);
    })
    this.currentIssues = data;
  });
 }

 All(){
   //get data
  this.dataService.GetCurrentIssues().subscribe((data: issues[]) => {
    console.log(data);
    data.forEach( element => {
      element.date = this.reformateDate(element.date);
      element.eta = this.reformateDate(element.eta);
    })
    this.currentIssues = data;
  });
 }



openSearch(){
  this.toggleSearch = true;
  this.searchbar.nativeElement.focus();
}

searchClose(){
  this.searchText = '';
  this.toggleSearch = false;
}


reformateDate(s: string): string{
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

}
