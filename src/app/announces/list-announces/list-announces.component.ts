import { Component, OnInit } from '@angular/core';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {SERVER_IMAGES_PATH} from '../../app.constants';

@Component({
  selector: 'app-list-announces',
  templateUrl: './list-announces.component.html',
  styleUrls: ['./list-announces.component.css']
})
export class ListAnnouncesComponent implements OnInit {

  myAnnounces: any[];
  // 'jaouad' should be the current username
  imagesDirectoryPath: any = SERVER_IMAGES_PATH + '/jaouad/';
  constructor(
    private announceDataService: AnnonceDataService
  ) { }

  ngOnInit(): void {
      this.announceDataService.getSpecificAnnounces('jaouad').subscribe(
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
