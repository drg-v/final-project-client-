import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  errorMessage: string = '';
  displayedColumns: string[] = ['id_', 'username', 'status', 'is_subscriber', 'trial_attempts', 'is_admin', 'block', 'subscribe'];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data.users;
        console.log(this.users);
      },
      err => {
        this.errorMessage = err.error.message;
      }
      );
  }

  block(id: number): void {
    this.userService.block(id).subscribe(
      data => {
        window.location.reload();
      }
      );
  }

  subscribe(id: number): void {
    this.userService.subscribe(id).subscribe(
      data => {
        window.location.reload();
      }
      );
  }



}
