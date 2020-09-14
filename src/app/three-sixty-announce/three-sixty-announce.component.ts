import { Component, OnInit } from '@angular/core';
import * as threeApp from '../../assets/threeJS/app.js'
import {AuthenticationService} from '../service/authentication.service';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {AnnounceModel} from '../model.ts/announce-model';
import {ActivatedRoute, Router} from '@angular/router';
import {SERVER_IMAGES_PATH} from '../app.constants';
import {SubscribeAccount} from '../service/data/user-data.service';
import {AnnoncerModel} from '../model.ts/annoncer-model';

@Component({
  selector: 'app-three-sixty-announce',
  templateUrl: './three-sixty-announce.component.html',
  styleUrls: ['./three-sixty-announce.component.css']
})
export class ThreeSixtyAnnounceComponent implements OnInit {

  error: string;
  announce: AnnounceModel;
  user: Object;
  announcer : AnnoncerModel;
  path = SERVER_IMAGES_PATH;

  constructor(public auth: AuthenticationService, public service:AnnonceDataService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    build('assets/threeJS/maisonMono1.jpg');
    this.initAnnounce();
  }

  initAnnounce() {
    this.service.getAnnounceByID(this.route.snapshot.paramMap.get('id')).subscribe(
      success => {
        this.announce = success['data'];
        this.service.getAnnounceUser(this.announce.id).subscribe(
          success => {
            this.user = success;
            // @ts-ignore
            this.path += this.user.username + '/';
            console.log("baaa");
          }
        );
        this.service.getAnnounceAnnouncer(this.announce.id).subscribe(
          success => {
            this.announcer = success;
            console.log(this.announcer);
          }
        );
      },
      error => {
        this.error = error.error;
      }
    );
    console.log(this.announce);
  }

  fullScreen() {
    // @ts-ignore
    toggleFull();
  }
  toggled = false;
  toggle() {
    this.toggled = !this.toggled;
    if(this.toggled) {
      document.getElementById('infos').style.display = 'block';
    } else {
      document.getElementById('infos').style.display = 'none'
    }
  }

}
