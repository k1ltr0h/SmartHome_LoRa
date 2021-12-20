import { Component, OnInit } from '@angular/core';
import { Light} from '../../modelos/light'
import { LightService} from '../../servicios/light/light.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-living',
  templateUrl: './living.component.html',
  styleUrls: ['./living.component.css'],
  providers: [LightService]
})
export class LivingComponent implements OnInit {

  constructor(private lightService:LightService, private router: Router) { }

  ngOnInit() {
    //this.getLights();
  }

  /*getLights(){
    this.lightService.getLivingLights().subscribe((res) => {
      console.log(res);
      this.lightService.lights = res;
    });
  }*/

}