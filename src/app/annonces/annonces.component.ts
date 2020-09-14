import {Component, OnInit} from '@angular/core';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {Router} from '@angular/router';
import {CITIES} from '../app.constants';
import {AnnounceModel} from '../model.ts/announce-model';
import {AuthenticationService} from '../service/authentication.service';
import {NamedRouterService} from '../service/security/named-router.service';


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
    surface: 0,
    budget_min: 1,
    budget_max: 100000,
    pieces: 20,
  };
  cities: string[];

  constructor(private annonceData: AnnonceDataService, private router: Router, public auth:AuthenticationService, public n_router:NamedRouterService) {
    this.cities = CITIES;
    const k = this.router.getCurrentNavigation().extras.state;
    this.filters.keyword = k !== undefined ? k.keyword : '';
    // console.log(this.router.getCurrentNavigation().extras.state.keyword); // should log out 'bar'
  }


  ngOnInit(): void {
    this.getAnnoncesByFilters();
    document.getElementById('switchable-nav').classList.add('d-none');
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

  goToMap() {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['map']);
    }
    else {
      this.n_router.routeTo('map', 'dashboard', true);
    }
  }
}
