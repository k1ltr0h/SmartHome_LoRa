import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rooma',
  templateUrl: './rooma.component.html',
  styleUrls: ['./rooma.component.css']
})
export class RoomaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  ngOnInit() {
  }

}
