import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TeamService } from '../_services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  teamForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private teamService: TeamService,
              private router: Router) {
    this.teamForm = this.fb.group({
        name: ['', Validators.required],
        goals_for: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        goals_against: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        wins: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        losses: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        value: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        points: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      }
    );
  }

  ngOnInit(): void {
  }

  submit(): void {
    const values = this.teamForm.value;
    console.log(values);
    this.teamService.create(values.name, values.goals_for,
         values.goals_against, values.wins, values.losses,
         values.value, values.points).subscribe(
          data => {
            this.router.navigate(['/teams']);
          },
          err => {
            this.errorMessage = err.error.message;
          }
         );
  }

}
