import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Light} from '../../modelos/light';
import {Room} from '../../modelos/rooms';

@Injectable({
  providedIn: 'root'
})
export class LightService {
  selectedLight: Light;
  lights: Light[];
  light: any;
  constructor(private http: HttpClient) { 
    this.selectedLight = new Light();
  }

  getLight(){
    return this.http.get('http://localhost:8080/data/lights');
  }

  postLight(light: Light){
    return this.http.post('http://localhost:8080/data/lights', light);
  }

  putLight(light: Light) {
    return this.http.put('this.localhost:8080/data/lights/update', light);
  }

  getBalconyLights(){
    return this.http.get('http://localhost:8080/data/lights?room_name=balcony')
  }

  getLivingLights(){
    return this.http.get('http://localhost:8080/data/lights?room_name=living')
  }

  getRoomaLights(){
    return this.http.get('http://localhost:8080/data/lights?room_name=room_a')
  }

}
