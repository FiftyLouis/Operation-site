import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API = "http://localhost:49155";
  constructor(private httpClient: HttpClient) { }

  getAllIssues(): Observable<any> {
    return this.httpClient.get(this.API+"/GetAllIssues");
  }

  getAllPm(): Observable<any>{
    return this.httpClient.get(this.API+"/GetAllPm");
  }

  GetPmScheduledDate() : Observable<any> {
    return this.httpClient.get(this.API+"/GetPmScheduledDate");
  }

  GetCurrentIssues(): Observable<any> {
    return this.httpClient.get(this.API+"/GetCurrentIssues");
  }

  GetHistoricalIssues(): Observable<any>{
    return this.httpClient.get(this.API+"/GetHistoricalIssues");
  }

  GetCurrentIssuesAdmin(): Observable<any>{
    return this.httpClient.get(this.API+"/GetCurrentIssuesAdmin");
  }

  SolvedIssue(id:number, date: Date): Observable<any>{
    console.log(id,date);
    const url = `http://localhost:49155/SolvedIssue?id=${id}&date=${date}`
    return this.httpClient.post(url, {});
  }

  CreateIssue(a:string, t:string, eta:string) : Observable<any>{
  return this.httpClient.post(this.API+"/CreateIssue", { a, t, eta});
  }

  GetPmAdmin(): Observable<any>{
    return this.httpClient.get(this.API+"/GetPmAdmin");
  }

  DeletePmAdmin(id:number): Observable<any>{
    const url = `http://localhost:49155/DeletePmAdmin?id=${id}`;
    return this.httpClient.delete(url)
  }

  CreatePm(a:string, t:string, s:string): Observable<any>{
    return this.httpClient.post(this.API+"/CreatePm", { a, t, s});
  }

  GetHistoricalPmAdmin(): Observable<any>{
    return this.httpClient.get(this.API+"/GetHistoricalPmAdmin");
  }

}
