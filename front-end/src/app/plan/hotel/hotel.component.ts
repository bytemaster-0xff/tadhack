import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  countryCode: string | undefined;
  city: any | undefined;
  cities: any[] | undefined;
  hotels: any[] | undefined;
  hotelDetails: any | undefined;

  constructor(private userService: UserService, private hotelService: HotelService) { }

  ngOnInit() {
    this.countryCode = 'US';
    this.city = 'Orlando';
  }

  searchDesinationHotels = async () => {
    await this.hotelService.getCityCodes(this.countryCode!, this.city!)
      .then(response => {
        this.cities = response;
      })
      .finally();
  };

  getCityHotels = async (cityCode: string) => {
    await this.hotelService.getCityHotels(cityCode)
      .then(async (response: any) => {
        this.hotels = response;
        const hotelIds = response.map((item: any) => { 
          item.hasAvailability = 'No';
          return item.hotelId; 
        });
        await this.getHotelDetails(hotelIds);
      });
  };

  getHotelDetails = async (hotelCodes: string[]) => {
    await this.hotelService.getHotelDetails(hotelCodes)
      .then((response: any) => {
        response?.forEach((offer: any) => {
          const hotel = this.hotels?.find((item: any) => item.hotelId === offer.hotel.hotelId);
          if (hotel) {
            if (hotel.offers) {
              hotel.offers.push(offer.offers);
            }
            else {
              hotel.offers = offer.offers;
            }
            hotel.hasAvailability = 'YES';
          }
        });
      })
      .finally(() => {
        const eligibles = this.hotels?.filter((item: any) => {
          return item.hasAvailability === 'YES';
        });

        this.hotels = eligibles;
      });
  };

  

  showHotelDetails = async (hotelId: string) => {
    this.hotelDetails = this.hotels?.find((item: any) => item.hotelId === hotelId);
  };
}
