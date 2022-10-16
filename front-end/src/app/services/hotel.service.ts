import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  base: string = "https://api-ivr.iothost.net";
  hotelBase1: string = "https://test.api.amadeus.com/v1";
  hotelBase2: string = "https://test.api.amadeus.com/v2";
  hotelBase3: string = "https://test.api.amadeus.com/v3";
  
  tokenType: string | undefined;
  token: string | undefined;

  constructor(private client: HttpClient) {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    (async () => {
      await this.requestPost('https://test.api.amadeus.com/v1/security/oauth2/token', 'grant_type=client_credentials&client_id=FtEWSI9WPes3s5EMMVIsGRkuGpwAm0Xn&client_secret=6yOMxI47QbeATraW', headers)
        .then((response: any) => {
          // console.log('hotelService: ctor: response', response, new Date());
          if (response.access_token) {
            this.tokenType = response.token_type;
            this.token = response.access_token;
          }
          else {
            alert('could not retrieve hotel api access token');
          }
        });
    })();
  }

  getAuthorizationHeader = (): any => {
    return `Authorization: ${this.tokenType} ${this.token}` ;
  };

  request<TData>(url: string, headers?: any): Promise<TData> {
    const promise = headers
      ? new Promise<TData>((resolve, reject) => {
        this.client.get<TData>(url, { headers: headers })
          .subscribe((response) => {
            resolve(response);
          },
            (err) => {
              reject(err.message);
            });
      })
      : new Promise<TData>((resolve, reject) => {
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


  requestPost<TData>(url: string, data: any, headers: any): Promise<TData> {
    const promise = headers
      ? new Promise<TData>((resolve, reject) => {
        this.client.post<TData>(url, data, { headers: headers || undefined })
          .subscribe((response) => {
            resolve(response);
          },
            (err) => {
              reject(err.message);
            });
      })
      : new Promise<TData>((resolve, reject) => {
        this.client.post<TData>(url, data)
          .subscribe((response) => {
            resolve(response);
          },
            (err) => {
              reject(err.message);
            });
      });

    return promise;
  }

  async getCityCodes(countryCode: string, city: string): Promise<any> {
    let url = `${this.hotelBase1}/reference-data/locations/cities?countryCode=${countryCode}&keyword=${encodeURIComponent(city)}`;
    let headers = this.getAuthorizationHeader();
    let response: any = await this.request(url, headers);
    return response.data;
  }

  async getCityHotels(cityCode: string): Promise<any> {
    let url = `${this.hotelBase1}/reference-data/locations/hotels/by-city?cityCode=${cityCode}`;
    let headers = this.getAuthorizationHeader();
    let response: any = await this.request(url, headers);
    return response.data;
  }

  async getHotelDetails(hotelCodes: string[]): Promise<any> {
    let url = `${this.hotelBase3}/shopping/hotel-offers?hotelIds=${hotelCodes}`;
    let headers = this.getAuthorizationHeader();
    let response: any = await this.request(url, headers);
    return response.data;
  }

}
