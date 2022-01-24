import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5000/predictions/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) {  }
 
  predict(id: number): Observable<any> {
    return this.http.get(AUTH_API + id, httpOptions);
  }
}
