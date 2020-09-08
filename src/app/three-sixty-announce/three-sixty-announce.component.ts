import { Component, OnInit } from '@angular/core';
import * as threeApp from '../../assets/threeJS/app.js'
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-three-sixty-announce',
  templateUrl: './three-sixty-announce.component.html',
  styleUrls: ['./three-sixty-announce.component.css']
})
export class ThreeSixtyAnnounceComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    // @ts-ignore
    build('assets/threeJS/test2.jpg');
  }

}
