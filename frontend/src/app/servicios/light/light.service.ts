import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/internal/operators';
import {HttpClient, HttpResponse} from '@angular/common/http'
import {Light} from '../../modelos/light';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import {Room} from '../../modelos/rooms';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LightService {
  selectedLight: Light;
  lights: Light[];
  light: any;
  constructor(private http: HttpClient, ) { 
    this.selectedLight = new Light();
  }

  getLights(): Observable<HttpResponse<Light[]>> {
    return this.http.get<Light[]>(
      'http://localhost:8080/data/lights', { observe: 'response' });
  }

  getLightsbyRoom(room: string): Observable<HttpResponse<Light[]>> {
    return this.http.get<Light[]>(
      'http://localhost:8080/data/lights?room_name='+`${room}`, { observe: 'response' });
  }
  
  getRoomData(room: string): Observable<HttpResponse<Room[]>> {
    return this.http.get<Room[]>(
      'http://localhost:8080/data/rooms?name='+`${room}`, { observe: 'response' });
  }

  updateLight(id: any, light: Light): Observable<Light> {
    return this.http.put<Light>('http://localhost:8080/data/lights/update', light, httpOptions);
  }
}
