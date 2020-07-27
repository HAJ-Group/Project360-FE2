import { Component, OnInit } from '@angular/core';
import {CITIES} from '../app.constants';
import {AnnoncerModel} from '../model.ts/annoncer-model';
import {AnnoncerDataService} from '../service/data/annoncer-data.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';

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

  constructor(private service: AnnoncerDataService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('registered') === this.auth.getAuthenticatedUser()) this.router.navigate(['dashboard']);
    this.data = new AnnoncerModel('', '', '', '', '', '', '', false, '');
  }

  addAnnouncer() {
    this.data.address = this.street_name + ', ' + this.street_number + ', ' + this.data.city;
    this.service.createAnnouncer(this.data).subscribe(
      success => {
        console.log('announcer created successfully');
        sessionStorage.setItem('registered', this.auth.getAuthenticatedUser());
        this.router.navigate(['dashboard']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
