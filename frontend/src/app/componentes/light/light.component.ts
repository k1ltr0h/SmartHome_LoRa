import { Component, OnInit } from '@angular/core';
import { Light} from '../../modelos/light'
import { LightService} from '../../servicios/light/light.service';

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
      .subscribe(res => {
        console.log(res);
        this.lightService.lights = res as Light[];
      });
  }
}
