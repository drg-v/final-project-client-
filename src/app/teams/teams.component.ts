import { Component, OnInit } from '@angular/core';
import { TeamService } from '../_services/team.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  errorMessage = '';
  teams: any[] = [];
  displayedColumns: string[] = ['id_', 'name', 'wins', 'losses', 'goals_for', 'goals_against', 'points'];
  isAdmin = false;

  constructor(private teamService: TeamService,
              private tokenStorageService: TokenStorageService,
              ) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
      this.isAdmin = user.is_admin;
      if(this.isAdmin) {
        this.displayedColumns.push('delete');
  
      }
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

  delete(id: number) {
    this.teamService.delete(id).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
  }

}
