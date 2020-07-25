import { Component, OnInit } from '@angular/core';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {SERVER_IMAGES_PATH} from '../../app.constants';

@Component({
  selector: 'app-list-announces',
  templateUrl: './list-announces.component.html',
  styleUrls: ['./list-announces.component.css']
})
export class ListAnnouncesComponent implements OnInit {

  myAnnounces: any;
  imagesDirectoryPath = SERVER_IMAGES_PATH;
  targetAnnounceId: number;

  constructor(
    private announceDataService: AnnonceDataService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.imagesDirectoryPath += this.auth.getAuthenticatedUser() + '/';
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

  announceDetails(id): void{
    console.log(`The details of the announce with id = ${id}`);
    this.router.navigate(['dashboard', { outlets: { dashboard: ['announces', id] } }]);

  }

  deleteAnnounce(id): void{
    console.log(`announce with id = ${id} is deleted`);
    this.announceDataService.deleteAnnounce(this.auth.getAuthenticatedUser(), id).subscribe(
      success => {
        console.log(success);
        this.refreshSpecificAnnounces(this.auth.getAuthenticatedUser());
        },
      error => {
        console.log(error);
      }
    );
  }

  setAnnounceIdentifier(id){
    this.targetAnnounceId = id;
  }

  editAnnounce(id: number) {
    this.router.navigate(['dashboard', { outlets: { dashboard: ['announces', id, 'edit-announce'] } }]);
  }
}
