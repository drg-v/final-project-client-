import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    isAdmin = false;
    hide = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {

    this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    )
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.isAdmin = this.tokenStorage.getUser().is_admin;
    }
  }

  onSubmit(): void {
    const values = this.loginForm.value;
    this.authService.login(values.username, values.password).subscribe(
      data => {
        console.log(data);
        console.log(data.user);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.isAdmin = this.tokenStorage.getUser().is_admin;
        console.log(this.isAdmin);
        this.router.navigate(['/teams'])
          .then(() => {
            this.reloadPage();
          })
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }


}
