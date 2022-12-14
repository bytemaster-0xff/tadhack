import { Component, OnInit } from '@angular/core';
import { DataloadService } from '../services/dataload.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  phoneNumber:string | undefined;
  users: any[] | undefined;

  constructor(private userService: UserService, private dataloadService: DataloadService) { }

  ngOnInit() {
    this.phoneNumber = '7274550530'
  }

  async showEvacuationZone() {
    this.users = await this.userService.getEvacuationZone(this.phoneNumber!);
  }

  async removeUser(id: string) {
    await this.userService.removeUser(id);
    console.log('removed');
    await this.showEvacuationZone();
  }

  async loadFloodZones() {
    await this.dataloadService.populateUserFloodZones();
  }

}
