import { Component, OnInit } from '@angular/core';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {AnnonceModel} from '../../model.ts/annonce-model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  announces: AnnonceModel[];
  constructor( public announceService: AnnonceDataService) {
  }
  ngOnInit(): void {
    this.loadAnnounces();
  }

  loadAnnounces(): void {
    this.announceService.getUserAnnonces().subscribe(
      success => {
        this.announces = success;
      }
    );
  }

}
