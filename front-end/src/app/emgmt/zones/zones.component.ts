import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  users: any[] | undefined;
  zones: string[] | undefined;
  levels: string[] | undefined;
  levelA: string | undefined;
  levelB: string | undefined;
  levelC: string | undefined;
  levelD: string | undefined;
  levelE: string | undefined;

  constructor(private userService: UserService) {
    (async () => {
      await this.userService.getAllUsers()
        .then((response: any) => {
          this.users = response;
        });
    })();
  }

  ngOnInit() {
    this.zones = ['A', 'B', 'C', 'D', 'E'];
    this.levels = ['No Evacuation Order', 'Evacuation Warning', 'Evacuation Ordered'];
  }

  notifyUsers = async (zone: string) => {
    const toNotify = this.users?.filter((user: any) => {
      return user.zone === zone;
    });

    console.log('toNotify', toNotify, new Date());

    let isOrder: boolean = false;
    switch (zone) {
      case 'A':
        isOrder = this.levelA === 'Evacuation Ordered';
        break;
      case 'B':
        isOrder = this.levelB === 'Evacuation Ordered';
        break;
      case 'C':
        isOrder = this.levelC === 'Evacuation Ordered';
        break;
      case 'D':
        isOrder = this.levelD === 'Evacuation Ordered';
        break;
      case 'E':
        isOrder = this.levelE === 'Evacuation Ordered';
        break;
    }
    
    toNotify?.forEach((user: any) => {
      console.log('notifying ', user.phone);
      console.log('isorder', isOrder);
      if (isOrder) {
        this.userService.notifyOrderUser(user.phone);
      }
      else {
        this.userService.notifyUser(user.phone);
      }
    });
  };

}
