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
    this.announce =
      new AnnounceModel(1, '', '', '', 0, '', '', '', '', '', false, 0);
  }

  addAnnounce() {

    this.announceDataService.createAnnounce('jaouad', this.announce).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );
  }
}
