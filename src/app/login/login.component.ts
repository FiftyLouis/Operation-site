import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import moment from 'moment';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  })



  constructor(private auth : AuthServiceService, private router: Router) {
   }

  ngOnInit(): void {
  }

  loginUser(){
    const val = this.loginForm.value;
    var result : any = this.auth.login(val.userName, val.password);
    if(result){
      window.location.href="http://localhost:49153"
    }


  }
}