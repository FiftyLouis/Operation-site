import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result! : string;

  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  })



  constructor(private auth : AuthServiceService, private router: Router, private modalService : BsModalService) {
   }

  ngOnInit(): void {
  }

  loginUser(){
    const val = this.loginForm.value;
    this.auth.login(val.userName, val.password);
  }
  
}