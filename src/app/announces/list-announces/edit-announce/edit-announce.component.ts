import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnnounceModel} from '../../../model.ts/announce-model';
import {CITIES} from '../../../app.constants';
import {AnnonceDataService} from '../../../service/data/annonce-data.service';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-edit-announce',
  templateUrl: './edit-announce.component.html',
  styleUrls: ['./edit-announce.component.css']
})
export class EditAnnounceComponent implements OnInit {

  cities: string[] = CITIES;
  id: number;
  announce: any;
  selectedFiles: [] = [];

  constructor(
    private route: ActivatedRoute,
    private announceDataService: AnnonceDataService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.announce = new AnnounceModel(this.id, '', '', '', 0, '', '', '', '', '', false, 1);
    this.retrieveAnnounce(this.auth.getAuthenticatedUser(), this.id);
  }

  retrieveAnnounce(username, id){
    this.announceDataService.retrieveAnnounce(username, id).subscribe(
      success => {
          console.log(success);
      },
      error => {
          console.log(error);
      }
    );
  }

  editAnnounce() {

  }
}
