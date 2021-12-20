import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LightComponent } from './componentes/light/light.component';
import { MapComponent } from './componentes/map/map.component';
import { BalconyComponent } from './componentes/balcony/balcony.component';
import { LivingComponent } from './componentes/living/living.component';
import { RoomaComponent } from './componentes/rooma/rooma.component';
import {CommonModule } from '@angular/common';
const appRoutes: Routes =  [
  {path: '', component: HomeComponent},
  {path: 'lights', component: LightComponent},
  {path: 'rooms', component: MapComponent},
  {path: 'rooms/balcony', component: BalconyComponent},
  {path: 'rooms/room_a', component: RoomaComponent},
  {path: 'rooms/living', component: LivingComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LightComponent,
    MapComponent,
    BalconyComponent,
    LivingComponent,
    RoomaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
