import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API = "http://localhost:49153";

  constructor(private http: HttpClient, private router: Router, private dialog : MatDialog) { 
  }

  ngOnInit(): void {
    console.log("initialize");
  }

  login(userName:string, password:string ) : Observable<any>{
    return this.http.post(this.API+"/login", {userName, password}, { responseType: 'text' });
}

logout() {
  localStorage.removeItem('currentUser');
  window.location.href="http://localhost:4200"
}

}
