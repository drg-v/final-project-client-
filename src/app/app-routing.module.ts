import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { UsersComponent } from './users/users.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { CreateMatchComponent } from './create-match/create-match.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'teams/create', component: CreateTeamComponent },
  {path: 'matches/create', component: CreateMatchComponent },
  {path: 'teams/:id', component: TeamComponent },
  {path: 'teams', component: TeamsComponent },
  {path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
