import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { MatchesComponent } from './matches/matches.component';
import { UsersComponent } from './users/users.component';
import { CreateMatchComponent } from './create-match/create-match.component';
import { CreateTeamComponent } from './create-team/create-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TeamsComponent,
    TeamComponent,
    MatchesComponent,
    UsersComponent,
    CreateMatchComponent,
    CreateTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    [MatDatepickerModule, MatNativeDateModule],
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
