import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataloadService {

  constructor(private client: HttpClient) { }

  base: string = "https://api-ivr.iothost.net";

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

  async populateUserFloodZones(): Promise<string> {
    let url = `${this.base}/dataload/floodzones`;
    return await this.request(url);
  }
}