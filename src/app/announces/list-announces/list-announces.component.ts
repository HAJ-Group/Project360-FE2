import { Component, OnInit } from '@angular/core';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {SERVER_IMAGES_PATH} from '../../app.constants';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-list-announces',
  templateUrl: './list-announces.component.html',
  styleUrls: ['./list-announces.component.css']
})
export class ListAnnouncesComponent implements OnInit {

  myAnnounces: any[];

  imagesDirectoryPath: string;
  constructor(
    private announceDataService: AnnonceDataService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
      this.imagesDirectoryPath = '/' + this.auth.getAuthenticatedUser() + '/';
      this.announceDataService.getSpecificAnnounces(this.auth.getAuthenticatedUser()).subscribe(
        success => {
          console.log(success);
          this.myAnnounces = success;
        },
        error => {
          console.log(error);
        }
      );
  }

}
