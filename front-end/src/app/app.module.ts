import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { HotelComponent } from './plan/hotel/hotel.component';
import { ZonesComponent } from './emgmt/zones/zones.component';

@NgModule({
  declarations: [		
    AppComponent,
      HomeComponent,
      UsersComponent,
      UserComponent,
      HotelComponent,
      ZonesComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
