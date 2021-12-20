import { Component, OnInit } from '@angular/core';
import { Light} from '../../modelos/light'
import { LightService} from '../../servicios/light/light.service';
import { NgForm } from "@angular/forms";
import {CommonModule } from '@angular/common';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css'],
  providers: [LightService]
})
export class LightComponent implements OnInit {

  constructor(private lightService:LightService) {}
  
  ngOnInit() {
    this.getLights();
  }

  getLights(){
    this.lightService.getLight()
      .subscribe((res) => {
      this.lightService.lights = res as Light[];
      console.log(res);
    });
    
  }

  editEmployee(light: Light) {
    this.lightService.selectedLight = light;
  }
}
