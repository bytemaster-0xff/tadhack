import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) { }

  fireAndForget = (url: string) => {
    this.client.get(url);
  }

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
        'Accept': 'text/plain'
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

  async getUser(id: string): Promise<any> {
    const user = await this.request<any>(`https://api-ivr.iothost.net/user/${id}`);
    console.log('response', user);
    return user;
  }

  async getAllUsers(): Promise<any[]> {
    const users = await this.request<any[]>('https://api-ivr.iothost.net/users');
    console.log('response', users);
    return users;
  }

  base: string = "https://api-ivr.iothost.net";

  async getEvacuationZone(phoneNumber: string): Promise<any> {
    var url = this.base + `/user/${phoneNumber}`;
    return await this.request(url);
  }

  async removeUser(id: string): Promise<boolean> {
    console.log('userService: attempting to delete user', id, new Date());

    var url = this.base + `/user/${id}`;
    return await this.remove(url);
  }

  notifyUser = async (id: string) => {
    await this.request(`https://api-ivr.iothost.net/calls/place/${id}/notify`);
  }

  notifyOrderUser = async (id: string) => {
    await this.request(`https://api-ivr.iothost.net/calls/place/${id}/notifyorder`);
  }

}
