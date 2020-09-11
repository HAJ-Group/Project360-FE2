import {Component, Input, OnInit} from '@angular/core';
import {ImageModel} from '../model.ts/Image-model';
import {SERVER_IMAGES_PATH} from '../app.constants';
import {AnnoncerDataService} from '../service/data/annoncer-data.service';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {NamedRouterService} from '../service/security/named-router.service';

@Component({
  selector: 'app-card-announce',
  templateUrl: './card-announce.component.html',
  styleUrls: ['./card-announce.component.css']
})
export class CardAnnounceComponent implements OnInit {

  imagesDirectoryPath = SERVER_IMAGES_PATH;
  targetAnnounceId = 0;

  @Input()
  id: string;
  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  price: string;
  @Input()
  city: string;
  @Input()
  images: ImageModel[];
  @Input()
  created_at: string;

  constructor(public service: AnnonceDataService, public auth: AuthenticationService, public router: NamedRouterService) { }

  ngOnInit(): void {
    this.service.getAnnounceUser(this.id).subscribe(
      success => {
        // @ts-ignore
        this.imagesDirectoryPath += success.username + '/';
        console.log(this.imagesDirectoryPath);
      }
    );
  }

  setAnnounceIdentifier(id) {
    //this.targetAnnounceId = id;
    localStorage.setItem('targeted', id);
  }

  announceDetails(id): void {
    console.log(`The details of the announce with id = ${id}`);
    this.router.defaultRoute('vview/' + id, true);
  }

  deleteAnnounce(): void {
    let id = localStorage.getItem('targeted');
    console.log(`announce with id = ${id} is deleted`);
    this.service.deleteAnnounce(this.auth.getAuthenticatedUser(), id).subscribe(
      success => {
        console.log(success);
        localStorage.removeItem('targeted');
        this.router.routeTo('announces', 'dashboard', true);
      },
      error => {
        console.log(error);
      }
    );
  }

  editAnnounce(id) {
    this.router.routeTo('edit-announce', 'dashboard', true);
  }

}
