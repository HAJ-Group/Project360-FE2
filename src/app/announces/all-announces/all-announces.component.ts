import { Component, OnInit } from '@angular/core';
import {AnnounceModel} from '../../model.ts/announce-model';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-announces',
  templateUrl: './all-announces.component.html',
  styleUrls: ['./all-announces.component.css']
})
export class AllAnnouncesComponent implements OnInit {
  annonces: AnnounceModel[];

  constructor(private annonceData: AnnonceDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAnnonces();
  }
  getAnnonces() {
    this.annonceData.getAnnonces().subscribe(data => {
      this.annonces = data['1'];
      console.log(this.annonces);
    });
  }
}
