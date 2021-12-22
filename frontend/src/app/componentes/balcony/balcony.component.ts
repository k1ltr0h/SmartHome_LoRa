import { Component, OnInit } from '@angular/core';
import { Light} from '../../modelos/light'
import { Room} from '../../modelos/rooms'
import { LightService} from '../../servicios/light/light.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-balcony',
  templateUrl: './balcony.component.html',
  styleUrls: ['./balcony.component.css']
})
export class BalconyComponent implements OnInit {

  constructor(private lightService:LightService, private router: Router) {}
  strng = 'balcony';
  light: Light[] = [];
  room: Room;
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
          this.room = resp.body.data;
      });
  }
}