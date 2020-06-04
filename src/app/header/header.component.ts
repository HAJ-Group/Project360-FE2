import { Component, OnInit } from '@angular/core';
import {$} from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.toggled = !this.toggled;
    if (this.toggled) {
      document.getElementById('header-description').style.display = 'none';
    }
    else {
      document.getElementById('header-description').style.display = 'block';
    }
  }

}
