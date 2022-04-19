import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthServiceService } from '../auth-service.service';
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

  constructor(private dataService : DataService, private auth : AuthServiceService) { }

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
    
  }



}
