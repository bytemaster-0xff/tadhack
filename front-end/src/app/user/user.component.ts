import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any | undefined;
  constructor(private userService: UserService) { }

  async ngOnInit() {
    let id = '18502125744';
    this.getUser(id);
  }

  getUser = async (id: string) => {
    this.user = await this.userService.getUser(id);
    console.log('user page: ', this.user, new Date());    
  };

}
