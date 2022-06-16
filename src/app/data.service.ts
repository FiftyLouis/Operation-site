import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API = environment.apiUrl;
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
    const url = this.API +`/SolvedIssue?id=${id}&date=${date}`;
    return this.httpClient.post(url, {});
  }

  CreateIssue(a:string, t:string, eta:string) : Observable<any>{
    const url = this.API +`/CreateIssue?AffectedSolutions=${a}&Text=${t}&ETA=${eta}`;
    return this.httpClient.post(url, {});
  }

  DeletePmAdmin(id:number): Observable<any>{
    const url = this.API + `/DeletePmAdmin?id=${id}`;
    return this.httpClient.delete(url)
  }

  CreatePm(a:string, t:string, s:string, d:string): Observable<any>{
    const url = this.API +`/CreatePm?AffectedSolutions=${a}&Text=${t}&s=${s}&d=${d}`;
    return this.httpClient.post(url, {});
  }

  GetHistoricalPmAdmin(): Observable<any>{
    return this.httpClient.get(this.API+"/GetHistoricalPmAdmin");
  }

  GetIssues(id :number): Observable<any> {
    const url = this.API + `/GetIssues?id=${id}`;
    return this.httpClient.get(url);
  }

  GetPm(id: number): Observable<any> {
    const url = this.API + `/GetPm?id=${id}`;
    return this.httpClient.get(url,)
  }

  editTextIssue(id : number, text :string): Observable<any> {
    const url = this.API + `/editTextIssue?id=${id}&t=${text}`;
    return this.httpClient.post(url, {});
  }

  editSolutionIssue(id : number, text :string): Observable<any> {
    const url = this.API + `/editSolutionIssue?id=${id}&s=${text}`;
    return this.httpClient.post(url, {});
  }

  editEtaIssue(id : number, eta :string): Observable<any> {
    const url = this.API +`/editEtaIssue?id=${id}&date=${eta}`;
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

  DeleteIssues(id:number): Observable<any>{
    const url = this.API +`/deleteIssues?id=${id}`;
    return this.httpClient.delete(url);
  }

  modifDuration(id:number, text:string): Observable<any>{
    const url = this.API +`/modifDuration?id=${id}&date=${text}`;
    return this.httpClient.post(url, {}); 
  }
}
