import { Component, OnInit } from '@angular/core';
import { MatchService } from '../_services/match.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  startDate: Date = new Date();;
  endDate: Date = new Date();;
  matches: any[] = [];
  errorMessage = '';
  id: string = '';
  displayedColumns: string[] = [ 'date', 'home', 'away' ];


  constructor(private matchService: MatchService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id != null ? id : " ";
  }

  selectAll(): void {
    this.matchService.getAllMatches(this.id).subscribe(
      data => {
              this.matches = data.matches;
              console.log(this.matches);
      },
      err => {
        this.errorMessage = err.error.message;
      }
      );
  }

  selectByRange(): void {
      this.matchService.getMatchesByRange(this.id, this.startDate, this.endDate)
          .subscribe(
            data => {
              this.matches = data.matches;
              console.log(this.matches);
            },
            err => {
              this.errorMessage = err.error.message;
            }
            );
  }

}
