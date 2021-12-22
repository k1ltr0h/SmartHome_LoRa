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
  light: Light[] = [];

  ngOnInit() {
    this.getLights();
  }

  getLights() {
    this.lightService.getLights()
      .subscribe(resp => {
        for (const data of resp.body.data) {
          this.light.push(data);
        }
      });
  }

  editLight(light: Light) {
    this.lightService.selectedLight = light;
  }
}
