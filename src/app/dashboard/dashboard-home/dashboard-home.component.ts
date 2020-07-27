import { Component, OnInit } from '@angular/core';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {AnnounceModel} from '../../model.ts/announce-model';
import {Router} from '@angular/router';
import {NamedRouterService} from '../../service/security/named-router.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  announcesCount = 0;
  announces: AnnounceModel[];

  constructor( public announceService: AnnonceDataService, public router: NamedRouterService) {
  }

  ngOnInit(): void {
    this.loadAnnounces();
  }

  loadAnnounces(): void {
    this.announceService.getUserAnnonces().subscribe(
      success => {
        this.announces = success;
        this.announcesCount = this.announces.length;
      }
    );
  }
}
