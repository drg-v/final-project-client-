import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserCredentials } from './user_credentials';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_url: string = 'http://127.0.0.1:5000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(userCredentials: UserCredentials) {
    return this.http.post<any>(`${this.auth_url}/login`, userCredentials)
      .subscribe((result: any) => {
        localStorage.setItem('access_token', result.token)
        this.getUser(userCredentials.username)
      })
  }

  getUser(username): Observable<any> {
    let user_url = 'http://127.0.0.1:5000/user';
    return this.http.get(user_url,
      {'all': 'False', 'username': username},
      { headers: this.headers })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
