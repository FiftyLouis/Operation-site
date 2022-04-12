import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../Models/User';
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
    this.auth.login(val.userName, val.password)
      .subscribe((data : any) => {
        console.log(data);
        localStorage.setItem('currentUser', data[0]);
        localStorage.setItem('expires_at', JSON.stringify(data[1].valueOf()))
        this.router.navigateByUrl('/');
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expires_at');
  }
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    return moment(expiration);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}