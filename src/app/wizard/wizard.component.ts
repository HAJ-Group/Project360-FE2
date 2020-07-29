import { Component, OnInit } from '@angular/core';
import {CITIES} from '../app.constants';
import {AnnoncerModel} from '../model.ts/annoncer-model';
import {AnnoncerDataService} from '../service/data/annoncer-data.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {NamedRouterService} from '../service/security/named-router.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  cities: string[] = CITIES;
  street_name: string;
  street_number: string;
  data: AnnoncerModel;

  constructor(private service: AnnoncerDataService, private router: Router, private auth: AuthenticationService, private n_router: NamedRouterService) { }

  ngOnInit(): void {
    this.service.getUserAnnouncer().subscribe(
      success => {
        if(Object.keys(success).length !== 0) this.n_router.defaultRoute('dashboard', true);
      }
    );
    this.data = new AnnoncerModel('', '', '', '', '', '', '', false, '');
  }

  addAnnouncer() {
    this.data.address = this.street_name + ', ' + this.street_number + ', ' + this.data.city;
    this.service.createAnnouncer(this.data).subscribe(
      success => {
        console.log('announcer created successfully');
        localStorage.setItem('registered', this.auth.getAuthenticatedUser());
        this.n_router.defaultRoute('dashboard', true);
      },
      error => {
        console.log(error);
      }
    );
  }

}
