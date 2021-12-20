import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-balcony',
  templateUrl: './balcony.component.html',
  styleUrls: ['./balcony.component.css']
})
export class BalconyComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  ngOnInit() {
  }

}
