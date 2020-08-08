import { Component, OnInit } from '@angular/core';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {SERVER_IMAGES_PATH} from '../../app.constants';
import {AnnounceModel} from '../../model.ts/announce-model';

@Component({
  selector: 'app-list-announces',
  templateUrl: './list-announces.component.html',
  styleUrls: ['./list-announces.component.css']
})
export class ListAnnouncesComponent implements OnInit {

  myAnnounces: AnnounceModel[];

  constructor(
    private announceDataService: AnnonceDataService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
      this.refreshSpecificAnnounces(this.auth.getAuthenticatedUser());
  }

  refreshSpecificAnnounces(authenticatedUser){
    this.announceDataService.getSpecificAnnounces(authenticatedUser).subscribe(
      success => {
        console.log(success);
        this.myAnnounces = success;
      },
      error => {
        console.log(error);
        this.myAnnounces = null;
      }
    );
  }
}
