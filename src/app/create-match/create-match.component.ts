import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatchService } from '../_services/match.service';
import { TeamService } from '../_services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  matchForm: FormGroup;
  teams: any[] = [];
  errorMessage = '';
  date: Date = new Date();

  constructor(private fb: FormBuilder,
              private matchService: MatchService,
              private teamService: TeamService,
              private router: Router) {
    this.matchForm = this.fb.group({
        date: [new Date(), Validators.required],
        home: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        away: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        }
    );
  }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(
      data => {
        this.teams = data.teams;
        console.log(this.teams);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  submit(): void {
    const values = this.matchForm.value;
    if(values.home != values.away) {
      console.log(values);
      this.matchService.create(values.home, values.away, this.date).subscribe(
            data => {
              this.router.navigate(['/teams']);
            },
            err => {
              this.errorMessage = err.error.message;
            }
           );
    }
  }

  updateFormDate(value: any): void {
    console.log(value);
    this.matchForm.patchValue({
      date: value
    });
  }

}
