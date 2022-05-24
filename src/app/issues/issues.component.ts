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
    window.location.href="http://localhost:4200/currentIssues";
  }

  openModal(template: TemplateRef<any>, id : number) {
    this.idSolved = id;
    this.modalRef = this.modalService.show(template);
 }

 Added(int:number){
   //get data
  this.dataService.GetCurrentIssues().subscribe((data: issues[]) => {
    var date = new Date().setHours(new Date().getHours()-int);
    //date.setDate(date.getHours()-int);
    //filter and set data chart
    console.log(date);
    this.currentIssues = data.filter(element => Date.parse(element.date).valueOf() >= date.valueOf());
  });
 }

 All(){
   //get data
  this.dataService.GetCurrentIssues().subscribe((data: issues[]) => {
    console.log(data);
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

}
