import { Component, OnInit } from '@angular/core';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {AuthenticationService} from '../../service/authentication.service';
import {AnnounceModel} from '../../model.ts/announce-model';
import {NamedRouterService} from '../../service/security/named-router.service';

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
    public router: NamedRouterService
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
