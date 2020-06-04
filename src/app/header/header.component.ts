import { Component, OnInit } from '@angular/core';
import {$} from 'protractor';
import {User, UserDataService} from '../service/data/user-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // LOGIN AND SUBSCRIBE -------------------------------------------------------------------------------------------------------------------
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
  city: string;
  password: string;
  confirmedPassword: string;
  photo: string;
  // GLOBAL ERROR HANDLER MESSAGE ----------------------------------------------------------------------------------------------------------
  error: string;
  // Others --------------------------------------------------------------------------------------------------------------------------------
  toggled = false;

  constructor(
    private service: UserDataService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.service.postLogin(new User(this.username, this.password)).subscribe(
      success => {
        console.log(success.token);
        localStorage.setItem('token', 'Bearer ' + success.token);
        sessionStorage.setItem('user', this.username);
        this.router.navigate(['']);
      },
      error => {
        this.error = error.message;
      }
    );
  }

  toggle(): void {
    this.toggled = !this.toggled;
    if (this.toggled) {
      document.getElementById('header-description').style.display = 'none';
    }
    else {
      document.getElementById('header-description').style.display = 'block';
    }
  }

}
