import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import { AnnounceModel } from '../model.ts/announce-model';
import {CITIES} from '../app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cities: string[] = CITIES;
  annonces: AnnounceModel[];
  premiumAnnonces: AnnounceModel[];
  errorMessage: string;

  constructor(
    private annonceData: AnnonceDataService
  ) {}

  ngOnInit(): void {
    this.getAnnonces();
    this.getPremiumAnnonces();
  }

  getAnnonces() {
    this.annonceData.getAnnonces().subscribe(data => {
      this.annonces = data['1'];
      // console.log(this.annonces);
    });
  }

  getPremiumAnnonces() {
    this.annonceData.getPremiumAnnonces().subscribe(data => {
      this.premiumAnnonces = data['1'];
      console.log(this.premiumAnnonces);
    });
  }

}
