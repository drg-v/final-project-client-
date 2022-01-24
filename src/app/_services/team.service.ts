import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TEAM_API = 'http://localhost:5000/teams';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any> {
    return this.http.get(TEAM_API, httpOptions);
  }

  create(name: string, goals_for: number, goals_against: number,
         wins: number, losses: number, value: number,
         points: number): Observable<any> {
    return this.http.post(TEAM_API, {
      "name": name,
      "goals_for": goals_for,
      "goals_against": goals_against,
      "wins": wins,
      "losses": losses,
      "value": value,
      "points": points
    }, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(TEAM_API + '/' + id, httpOptions);
  }

}
