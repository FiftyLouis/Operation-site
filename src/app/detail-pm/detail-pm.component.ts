import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-pm',
  templateUrl: './detail-pm.component.html',
  styleUrls: ['./detail-pm.component.css']
})
export class DetailPmComponent implements OnInit {

  id : number;

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
    })
  }

}
