import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {CITIES, STATES, TYPES} from '../../../app.constants';
import {AnnounceModel} from '../../../model.ts/announce-model';
import {AnnonceDataService} from '../../../service/data/annonce-data.service';
import {AnnounceImagesComponent} from './announce-images/announce-images.component';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-add-announce',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.css']
})
export class AddAnnounceComponent implements OnInit, AfterViewInit {

  cities: string[] = CITIES;
  types: string[] = TYPES;
  states: string[] = STATES;
  announce: AnnounceModel;
  selectedFiles: [] = [];

  @ViewChild(AnnounceImagesComponent) child;

  constructor(
    private announceDataService: AnnonceDataService,
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.announce =
      new AnnounceModel(1, '', '', '', 0, '', '', '', '', '', false, 0);
  }

  ngAfterViewInit(){
    this.selectedFiles = this.child.selectedFiles;
  }

  addAnnounce() {

    this.initErrors();
    this.announceDataService.createAnnounce(this.auth.getAuthenticatedUser(), this.announce, this.selectedFiles).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        if (typeof error.error === 'object') {
          // tslint:disable-next-line:forin
          for (const e in error.error) {
            document.getElementById('announce-' + e + '-error').innerHTML = error.error[e][0];
          }
        }
      }
    );

    /*
    this.announceDataService.storeImage(this.selectedFiles).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );*/
  }


  initErrors(): void {
    const elements = document.getElementsByClassName('text-danger');
    // @ts-ignore
    for (const element of elements) {
      element.innerHTML = null;
    }
  }
}
