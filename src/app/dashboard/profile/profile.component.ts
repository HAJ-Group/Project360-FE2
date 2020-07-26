import { Component, OnInit } from '@angular/core';
import {AnnoncerDataService} from '../../service/data/annoncer-data.service';
import {AnnoncerModel} from '../../model.ts/annoncer-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: AnnoncerModel;
  error: string;
  constructor(
    private service: AnnoncerDataService,
  ) {}

  ngOnInit(): void {
    this.service.getUserAnnouncer().subscribe(success =>{
      this.model = success;
      console.log(this.model)
    },error => {
      this.error = error.error;
    });
  }

}
