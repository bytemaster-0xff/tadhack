import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) { }

  request<TData>(url: string): Promise<TData> {
    const promise = new Promise<TData>((resolve, reject) => {
      this.client.get<TData>(url)
        .subscribe((response) => {
          resolve(response);
        },
          (err) => {
              reject(err.message);
          });
    });

    return promise;
  }

  remove(url: string): Promise<boolean> {
    var options = {
      headers: new HttpHeaders({
         'Accept':'text/plain'
      }),
      'responseType': 'text' as 'json'
   }

    const promise = new Promise<boolean>((resolve, reject) => {
      this.client.delete(url, options)
        .subscribe((response) => {
          console.log('resolved');
          resolve(true);
        },
          (err) => {
            console.log('rejected', err);
              reject(false);
          });
    });

    return promise;
  }

  async getUsers() {
    console.log('ask for user');
    var users = this.client.get('https://api-ivr.iothost.net/users/7274550530');
    users.subscribe(res => {
      console.log(res);
    })

    console.log('response', users);
  }

  base: string = "https://api-ivr.iothost.net";

  async getEvacuationZone(phoneNumber: string): Promise<any> {
    var url = this.base + `/user/${phoneNumber}`;
    return await this.request(url);
  }

  async removeUser(id: string): Promise<boolean> {
    var url = this.base + `/user/${id}`;
    return await this.remove(url);
  }

}
