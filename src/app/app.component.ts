import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'epl-predictions-client';

  isLoggedIn = false;
  isAdmin = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.isAdmin = user.is_admin;
      this.username = user.username;
    }
  }

  logout(): void {
    window.location.reload();
    this.tokenStorageService.logOut();
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      })
  }
}
