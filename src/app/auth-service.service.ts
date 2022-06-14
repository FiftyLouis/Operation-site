import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API = environment.apiUrl;

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
  window.location.href="";
}

}
