import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API = "http://localhost:49153";
  constructor(private httpClient: HttpClient) { }

  getAllIssues(): Observable<any> {
    return this.httpClient.get(this.API+"/GetAllIssues");
  }

  getAllPm(): Observable<any>{
    return this.httpClient.get(this.API+"/GetAllPm");
  }
}
