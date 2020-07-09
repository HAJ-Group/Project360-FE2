import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;
  profilePicture: string;
  announces: [];

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.log('loading dashboard');
    this.username = sessionStorage.getItem('user');
    this.cleanView();
  }

  logout(): void {
    this.auth.logout();
  }

  cleanView(): void {
    const fm = document.getElementsByClassName('modal-backdrop')[0];
    if (fm !== undefined && fm !== null) {
      fm.className = '';
    }
  }
}
