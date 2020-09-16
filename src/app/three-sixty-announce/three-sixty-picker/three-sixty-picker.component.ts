import {Component, Input, OnInit} from '@angular/core';
import {NamedRouterService} from '../../service/security/named-router.service';
import {ActivatedRoute} from '@angular/router';
import {AnnonceDataService} from '../../service/data/annonce-data.service';
import * as EF from '../../../assets/js/ElementFactory.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-three-sixty-picker',
  templateUrl: './three-sixty-picker.component.html',
  styleUrls: ['./three-sixty-picker.component.css']
})
export class ThreeSixtyPickerComponent implements OnInit {

  id;

  constructor(public n_router: NamedRouterService, public a_router: ActivatedRoute, public service: AnnonceDataService) { }

  ngOnInit(): void {
    this.id = this.a_router.snapshot.paramMap.get('id');
  }

  tst_img;
  handleFileInput(files: FileList) {
    this.tst_img = files.item(0);
    // @ts-ignore
    document.getElementById('blah').src = URL.createObjectURL(files[0]);
  }


  addTSTImages() {
    document.getElementById('error-submit').style.display = 'none';
    this.service.postTSTImage(this.tst_img, this.id).subscribe(
      success => {
        console.log(success);
          this.goToAnnounce();
      },
        error => {
          document.getElementById('error-submit').style.display = 'block';
          document.getElementById('error-submit').innerText = error.error;
        }
    );
  }

  goToAnnounce() {
    this.n_router.defaultRoute('vview/' + this.id, true);
  }


}
