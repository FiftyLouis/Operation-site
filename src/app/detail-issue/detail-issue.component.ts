import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

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

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

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
      this.issues.eta = this.reformatDate(this.issues.eta.split('T')[0]);
    })
  }

  reformatDate(s : string){
    const result = s.split('-').reverse();
    return result.join('/');
  }

}
