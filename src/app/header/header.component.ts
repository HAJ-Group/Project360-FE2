import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Others --------------------------------------------------------------------------------------------------------------------------------
  toggled = false;
  keyword: string;

  constructor(
    public router: Router
  ) { }

  static getCheckedRole(): string {
    const elements = document.getElementsByName('job');
    // @ts-ignore
    for ( const element of elements ) {
      if (element.checked){
        if (element.id === 'agent'){
          return '3';
        }
        else{
          return '2';
        }
      }
    }
    return null;
  }

  ngOnInit(): void {
  }

  toggle(): void {
    if (window.innerWidth > 700) {
      this.toggled = !this.toggled;
      if (this.toggled) {
        document.getElementById('header-description').style.display = 'none';
      }
      else {
        document.getElementById('header-description').style.display = 'block';
      }
    }
  }

  getSearchKey() {
    this.router.navigate(['/annonces'], {state: {keyword: this.keyword}});
  }

}
