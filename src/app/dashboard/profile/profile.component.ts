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

  profile_pic;
  handleFileInput(files: FileList) {
    this.profile_pic = files.item(0);
  }

  updateData(): void {
    this.service.updateAnnouncer(this.data.id, this.data).subscribe(
      success => {
        // updating picture as well
        this.service.postProfilePicture(this.profile_pic, this.data.id).subscribe(
          success => {
            location.reload();
          },
            error => {
          console.log(error.error);
        });
      },
      error => {
        this.error = error.error;
      }
    );
  }




}
