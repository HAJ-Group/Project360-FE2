import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnnounceModel} from '../../../model.ts/announce-model';
import {AnnonceDataService} from '../../../service/data/annonce-data.service';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-announce-details',
  templateUrl: './announce-details.component.html',
  styleUrls: ['./announce-details.component.css']
})
export class AnnounceDetailsComponent implements OnInit {

  id: number;
  announce: AnnounceModel;

  constructor(
    private route: ActivatedRoute,
    private announceDataService: AnnonceDataService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.announce = new AnnounceModel(this.id, '', '', '', 0, '', '', '', '', '', false, 1);
    this.announceDataService.retrieveAnnounce(this.auth.getAuthenticatedUser(), this.id).subscribe(
      success => {

      },
      error => {

      }
    );
  }

}
