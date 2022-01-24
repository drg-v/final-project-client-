import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const USERS_API = 'http://localhost:5000/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(USERS_API, httpOptions);
  }

  block(id: number): Observable<any> {
    const payload = {
      'operation': 'block'
    }
    return this.http.patch(USERS_API + '/' + id, payload, httpOptions);
  }

  subscribe(id: number): Observable<any> {
    const payload = {
      'operation': 'subscribe'
    }
    return this.http.patch(USERS_API + '/' + id, payload, httpOptions);
  }

}
