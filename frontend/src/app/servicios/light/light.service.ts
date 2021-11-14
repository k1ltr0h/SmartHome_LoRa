import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Light} from '../../modelos/light';

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

  postLight(Light: Light){
    return this.http.post('http://localhost:8080/data/lights', Light);
  }

}
