import { Component, OnInit } from '@angular/core';
import {CITIES} from '../../app.constants';
import {AnnounceModel} from '../../model.ts/announce-model';
import {AnnonceDataService} from '../../service/data/annonce-data.service';

@Component({
  selector: 'app-add-announce',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.css']
})
export class AddAnnounceComponent implements OnInit {

  cities: string[] = CITIES;
  announce: AnnounceModel;

  constructor(
    private announceDataService: AnnonceDataService
  ) { }

  ngOnInit(): void {
  }

  addAnnounce() {
    this.announceDataService.createAnnonce('jaouad', this.announce).subscribe(
      success => {
      },
      error => {
      }
    );
  }
}
