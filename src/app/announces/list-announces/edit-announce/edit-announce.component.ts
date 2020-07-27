import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnounceModel} from '../../../model.ts/announce-model';
import {CITIES} from '../../../app.constants';
import {AnnonceDataService} from '../../../service/data/annonce-data.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {AnnounceImagesComponent} from '../add-announce/announce-images/announce-images.component';

@Component({
  selector: 'app-edit-announce',
  templateUrl: './edit-announce.component.html',
  styleUrls: ['./edit-announce.component.css']
})
export class EditAnnounceComponent implements OnInit , AfterViewInit{

  cities: string[] = CITIES;
  id: number;
  announce: any;
  selectedFiles: [] = [];
  requiredImages;

  @ViewChild(AnnounceImagesComponent) child;

  constructor(
    private route: ActivatedRoute,
    private announceDataService: AnnonceDataService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.announce = new AnnounceModel(this.id, '', '', '', 0, '', '', '', '', '', 0, 0, 0, false, 1);
    this.retrieveAnnounce(this.auth.getAuthenticatedUser(), this.id);
  }

  ngAfterViewInit(){
    this.selectedFiles = this.child.selectedFiles;
    this.requiredImages = this.child.images;
  }

  retrieveAnnounce(username, id){
    this.announceDataService.retrieveAnnounce(username, id).subscribe(
      success => {
          console.log(success);
          this.announce = success;
      },
      error => {
          console.log(error);
      }
    );
  }

  updateAnnounce() {

    this.initErrors();
    this.announceDataService.updateAnnounce(this.auth.getAuthenticatedUser(), this.announce, this.selectedFiles).subscribe(
      success => {
        console.log(success);
        this.router.navigate(['dashboard', { outlets: { dashboard: ['announces'] } }]);
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
  }


  initErrors(): void {
    const elements = document.getElementsByClassName('text-danger');
    // @ts-ignore
    for (const element of elements) {
      element.innerHTML = null;
    }
  }


}
