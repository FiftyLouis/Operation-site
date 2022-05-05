import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  GetPmScheduledDate() : Observable<any> {
    return this.httpClient.get(this.API+"/GetPmScheduledDate");
  }

  GetCurrentIssues(): Observable<any> {
    return this.httpClient.get(this.API+"/GetCurrentIssues");
  }

  GetHistoricalIssues(): Observable<any>{
    return this.httpClient.get(this.API+"/GetHistoricalIssues");
  }

  SolvedIssue(id:number, date: Date): Observable<any>{
    console.log(id,date);
    const url = `http://localhost:49153/SolvedIssue?id=${id}&date=${date}`;
    return this.httpClient.post(url, {});
  }

  CreateIssue(a:string, t:string, eta:string) : Observable<any>{
    const url = `http://localhost:49153/CreateIssue?AffectedSolutions=${a}&Text=${t}&ETA=${eta}`;
    return this.httpClient.post(url, {});
  }

  DeletePmAdmin(id:number): Observable<any>{
    const url = `http://localhost:49153/DeletePmAdmin?id=${id}`;
    return this.httpClient.delete(url)
  }

  CreatePm(a:string, t:string, s:string): Observable<any>{
    const url = `http://localhost:49153/CreatePm?AffectedSolutions=${a}&Text=${t}&s=${s}`;
    return this.httpClient.post(url, {});
  }

  GetHistoricalPmAdmin(): Observable<any>{
    return this.httpClient.get(this.API+"/GetHistoricalPmAdmin");
  }

  GetIssues(id :number): Observable<any> {
    const url = `http://localhost:49153/GetIssues?id=${id}`;
    return this.httpClient.get(url);
  }

  GetPm(id: number): Observable<any> {
    const url = `http://localhost:49153/GetPm?id=${id}`;
    return this.httpClient.get(url,)
  }

  editTextIssue(id : number, text :string): Observable<any> {
    const url = `http://localhost:49153/editTextIssue?id=${id}&t=${text}`;
    return this.httpClient.post(url, {});
  }

  editSolutionIssue(id : number, text :string): Observable<any> {
    const url = `http://localhost:49153/editSolutionIssue?id=${id}&s=${text}`;
    return this.httpClient.post(url, {});
  }

  editEtaIssue(id : number, eta :string): Observable<any> {
    const url = `http://localhost:49153/editEtaIssue?id=${id}&date=${eta}`;
    return this.httpClient.post(url, {});
  }

  editTextPm(id : number, text :string): Observable<any> {
    const url = this.API +`/editTextPm?id=${id}&t=${text}`;
    return this.httpClient.post(url, {});
  }

  editSolutionPm( id : number, text : string){
    const url = this.API +`/editSolutionPm?id=${id}&t=${text}`;
    return this.httpClient.post(url, {});
  }

  editScheduledPm(id : number, date :string): Observable<any>{
    const url = this.API +`/editScheduledPm?id=${id}&date=${date}`;
    return this.httpClient.post(url, {});
  }
}
