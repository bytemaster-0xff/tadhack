import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesComponent } from './emgmt/zones/zones.component';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './plan/hotel/hotel.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'emgmt', component: ZonesComponent },
  { path: 'plan/hotel', component: HotelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
