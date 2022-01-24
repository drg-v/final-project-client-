import { Component, OnInit, Input } from '@angular/core';
import { PredictionService } from '../_services/prediction.service';
import { MatchService } from '../_services/match.service'
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  displayedColumns: string[] = ["date", "teams[0].name", "teams[1].name"]

  constructor(private predictionService: PredictionService,
              private matchService: MatchService,
              private tokenStorageService: TokenStorageService) { }

  @Input("match_arr")
  public matches: any[] = [];
  private errorMessage = '';
  private isAdmin = false;

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.isAdmin = user.is_admin;
  }

  predict(id: number): void {
    this.predictionService.predict(id).subscribe(
        data => {
          let index = this.matches.findIndex((element, index, array) => {
            return element.id_ === id ? true : false;
          });
          this.matches[index].prediction = [Math.round(data.home * 100) + '%',
                                            Math.round(data.away * 100) + '%',
                                            Math.round(data.draw * 100) + '%'];
          console.log(this.matches[index]);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
  }

  delete(id: number): void {
    this.matchService.delete(id).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
  }

}
