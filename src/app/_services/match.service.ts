import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

const MATCH_API = 'http://localhost:5000/matches';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getAllMatches(id: string): Observable<any> {
    return this.http.get(MATCH_API + '/' + id, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(MATCH_API + '/' + id, httpOptions);
  }

  getMatchesByRange(id: string, startDate: Date, endDate: Date): Observable<any> {
    let params = new HttpParams();
    const datepipe: DatePipe = new DatePipe('en-US');
    let startDateStr = datepipe.transform(startDate, 'YYYY-MMM-dd HH:mm:ss')
    console.log(startDateStr);
    console.log('______________');
    console.log(startDate);
    console.log('______________');
    startDateStr = startDateStr != null ? startDateStr : " ";
    let endDateStr = datepipe.transform(endDate, 'YYYY-MMM-dd HH:mm:ss')
    console.log(endDateStr);
    endDateStr = endDateStr != null ? endDateStr : " ";
    params = params.append('startDate', startDateStr);
    params = params.append('endDate', endDateStr);
    return this.http.get(MATCH_API + '/' + id, {params: params, 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  create(home: number, away: number, date: Date): Observable<any> {
    const datepipe: DatePipe = new DatePipe('en-US');
    let dateStr = datepipe.transform(date, 'YYYY-MMM-dd HH:mm:ss')
    console.log(dateStr);
    dateStr = dateStr != null ? dateStr : " ";
    const payload = {
      'home_id': home,
      'away_id': away,
      'match_date': dateStr
    }
    return this.http.post(MATCH_API, payload, httpOptions);
  }

}
