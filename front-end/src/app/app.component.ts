import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit  {
  constructor(private userService: UserService) {

  }

  async ngOnInit() {
    console.log('requesting users');
    await this.userService.getUsers();
  }

  title = 'front-end';
}
