import {Component, OnInit} from '@angular/core';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CITIES} from '../app.constants';
import {AnnounceModel} from '../model.ts/announce-model';


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  annonces: AnnounceModel[];

  filters = {
    keyword: '',
    status: '',
    type: '',
    city: '',
    surface: 0.0,
    budget_min: 1,
    budget_max: 100000,
    pieces: 20.00,
  };
  cities: string[];

  constructor(private annonceData: AnnonceDataService, private router: Router) {
    this.cities = CITIES;
    const k = this.router.getCurrentNavigation().extras.state;
    this.filters.keyword = k !== undefined ? k.keyword : '';
    // console.log(this.router.getCurrentNavigation().extras.state.keyword); // should log out 'bar'
  }


  ngOnInit(): void {
    this.getAnnoncesByFilters();
  }

  getAnnonces() {
    this.annonceData.getAnnonces().subscribe(data => {
      this.annonces = data['1'];
    });
  }

  selectChangeHandler(status, event) {
    console.log(event.target.value);
  }

  getAnnoncesByFilters() {
    this.annonceData.getAnnoncesByFilters(this.filters).subscribe(success => {
      this.annonces = success['data'];
      console.log(this.annonces);
    });
  }
}
