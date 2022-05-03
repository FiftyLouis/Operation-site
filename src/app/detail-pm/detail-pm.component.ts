import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

interface PM{
  id:number
  dateofCreation:string;
  scheduled: string;
  affectedSolutions: string;
  text: string;
  }
@Component({
  selector: 'app-detail-pm',
  templateUrl: './detail-pm.component.html',
  styleUrls: ['./detail-pm.component.css']
})
export class DetailPmComponent implements OnInit {

  id : number;
  PM : PM;

  constructor(private dataService: DataService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
    var p = params.get("id");
    if(!isNaN(Number(p))){
      this.id = Number(p);
    }else {
      console.log("not a number");
    }
    })
    this.dataService.GetPm(this.id).subscribe(data => {
      console.log(data);
      this.PM = data.value;
      this.PM.scheduled = this.reformatDate(this.PM.scheduled.split('T')[0]);
    })
  }

  reformatDate(s : string){
    const result = s.split('-').reverse();
    return result.join('/');
  }
}
