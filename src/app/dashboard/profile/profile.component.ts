import { Component, OnInit } from '@angular/core';
import {AnnoncerDataService} from '../../service/data/annoncer-data.service';
import {AnnoncerModel} from '../../model.ts/annoncer-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: AnnoncerModel;
  error = 15;
  constructor(
    private service: AnnoncerDataService,
  ) {}

  ngOnInit(): void {
    this.loadInitData();
  }

  loadInitData(): void {
    this.service.getUserAnnouncer().subscribe(
      success => {
        this.data = success;
        console.log(this.data);
      },
      error => {
        this.error = error.error;
      }
    );
  }

  updateData(): void {
    this.service.updateAnnouncer(this.data.id, this.data).subscribe(
      success => {
        location.reload();
      },
      error => {
        this.error = error.error;
      }
    );
  }

}
