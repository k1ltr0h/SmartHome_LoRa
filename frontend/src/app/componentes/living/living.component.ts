import { Component, OnInit } from '@angular/core';
import { Light} from '../../modelos/light'
import { Room} from '../../modelos/rooms'
import { LightService} from '../../servicios/light/light.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-living',
  templateUrl: './living.component.html',
  styleUrls: ['./living.component.css'],
  providers: [LightService]
})
export class LivingComponent implements OnInit {

  constructor(private lightService:LightService, private router: Router) {}
  strng = 'living';
  light: Light[] = [];
  room: Room[] = [];
  ngOnInit() {
    this.getLights();
    this.getData(); 
  }

  getLights() {
    this.lightService.getLightsbyRoom(this.strng)
      .subscribe(resp => {
        for (const data of resp.body.data) {
          this.light.push(data);
        }
      });
  }
  getData(){
    this.lightService.getRoomData(this.strng)
      .subscribe(resp => {
        for (const data of resp.body.data) {
          this.room.push(data);
          console.log(this.room);
        }
        console.log(this.room);
      });
  }
}