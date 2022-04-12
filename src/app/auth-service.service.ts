import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API = "http://localhost:49153";

  constructor(private http: HttpClient) { }

  login(userName:string, password:string ) {
    return this.http.post<any>(this.API+"/login", {userName, password})
  }

}
