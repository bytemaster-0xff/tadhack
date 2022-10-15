import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] | undefined;

  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit() {
    
    this.getUsers();
  }

  getUsers = async () => {
    this.users = await this.userService.getAllUsers();
    console.log('users page: ', this.users, new Date());    
  };

  async getUser(id: string) {
    console.log('users page: get user: ', id, new Date());
    this.router.navigate(['user', id]);
    await this.userService.removeUser(id);
    this.getUsers();
  }

  async removeUser(id: string) {
    console.log('users page: remove user: ', id, new Date());
    
    await this.userService.removeUser(id);
    this.getUsers();
  }

}
