import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from '../data.service';

interface PM{
id:number
dateofCreation:string;
scheduled: string;
affectedSolutions: string;
text: string;
}

@Component({
  selector: 'app-planning-maintenance',
  templateUrl: './planning-maintenance.component.html',
  styleUrls: ['./planning-maintenance.component.css']
})

export class PlanningMaintenanceComponent implements OnInit {

  modalRef!: BsModalRef;
  login : any;
  idRmv!: number;


  constructor(private dataService : DataService, private modalService : BsModalService) { }

  PlannedMaintenance: PM[] = [];

  ngOnInit(): void {
    this.dataService.GetPmScheduledDate().subscribe((data: PM[]) =>{
      console.log(data);
      this.PlannedMaintenance = data;
    })
    if(localStorage.key(0)){
      this.login = true;
    }else{
      this.login = false
    }
  }

  remove(){
    this.dataService.DeletePmAdmin(this.idRmv).subscribe((data : PM) => {
      console.log(data);
    });
    window.location.href="http://localhost:4200/planningMaintenance"
  }

  openModal(template: TemplateRef<any>, id : number) {
    this.idRmv = id;
    this.modalRef = this.modalService.show(template);
 }



}
