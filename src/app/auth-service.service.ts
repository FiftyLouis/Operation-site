import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PopLoginComponent } from './pop-login/pop-login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API = "http://localhost:49155";

  constructor(private http: HttpClient, private router: Router, private dialog : MatDialog) { 
  }

  ngOnInit(): void {

  }

  login(userName:string, password:string ){
    this.http.post(this.API+"/login", {userName, password}, { responseType: 'text' })
      .pipe(catchError((err) => {
        console.error(err);
        this.openDiag();
        return throwError(err);
      })).subscribe(data => {
        console.log(data)
        localStorage.setItem('currentUser', data);
        window.location.href="http://localhost:4200"
      });
}

logout() {
  localStorage.removeItem('currentUser');
  window.location.href="http://localhost:4200"
}

  openDiag(){
    this.dialog.open(PopLoginComponent);
  }

}
