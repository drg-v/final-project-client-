import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  hide = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const values = this.form.value;

    this.authService.register(values.username, values.password).subscribe(
        data => {
          if(data.status == "success") {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.router.navigate(['/login'])
          } else {
            this.isSuccessful = false;
            this.isSignUpFailed = true;
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }

}
