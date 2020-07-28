import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keyword: string;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {

  }
  getSearchKey() {
    this.router.navigate(['/annonces'], {state: {keyword: this.keyword}});
  }

}
