import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) { }

  async getUsers() {
    console.log('ask for user');
    var users = this.client.get('https://api-ivr.iothost.net/users/7274550530');
    users.subscribe(res => {
      console.log(res);
    })

    console.log('response', users);
  }

}
