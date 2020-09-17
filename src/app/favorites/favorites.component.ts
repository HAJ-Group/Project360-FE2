import { Component, OnInit } from '@angular/core';
import {AnnounceModel} from '../model.ts/announce-model';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {AuthenticationService} from '../service/authentication.service';
import {NamedRouterService} from '../service/security/named-router.service';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  myFavAnnounces: AnnounceModel[];

  constructor(
    private announceDataService: AnnonceDataService,
    private auth: AuthenticationService,
    public router: NamedRouterService
  ) { }

  ngOnInit(): void {
    this.refreshSpecificAnnounces(this.auth.getAuthenticatedUser());
  }

  refreshSpecificAnnounces(authenticatedUser){
    this.announceDataService.getFavoriteAnnounces(authenticatedUser).subscribe(
      success => {
        console.log(success);
        this.myFavAnnounces = success;
      },
      error => {
        console.log(error);
        this.myFavAnnounces = null;
      }
    );
  }

}
