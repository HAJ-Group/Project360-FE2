import { Component, OnInit } from '@angular/core';
import {CITIES} from '../../app.constants';
import {AnnonceModel} from '../../model.ts/annonce-model';

@Component({
  selector: 'app-add-announce',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.css']
})
export class AddAnnounceComponent implements OnInit {

  cities: string[] = CITIES;
  announce: AnnonceModel;

  constructor() { }

  ngOnInit(): void {
  }

}
