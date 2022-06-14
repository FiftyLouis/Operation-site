import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error : string;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [ Validators.required]),
  })

  modalRef : BsModalRef;
  @ViewChild('template') modal : TemplateRef<any>;

  constructor(private auth : AuthServiceService, private router: Router, private modalService : BsModalService) {
   }

  ngOnInit(): void {
  }

  loginUser(){
    const val = this.loginForm.value;
    this.auth.login(val.userName, val.password)
    .pipe(catchError((err) => {
      console.error(err);
      this.error = err.error;
      console.log(this.error);
      this.modalRef = this.modalService.show(this.modal);
      return throwError(err);
    })).subscribe(data => {
      console.log(data)
      localStorage.setItem('currentUser', data);
      window.location.href="";
    });
  }
  
}