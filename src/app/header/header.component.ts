import { Component, OnInit } from '@angular/core';
import {LoginAccount, SubscribeAccount, UserDataService} from '../service/data/user-data.service';
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
  birthday: string;
  phone: string;
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
    this.service.postLogin(new LoginAccount(this.username, this.password)).subscribe(
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

  subscribe() {
    if (this.password === this.confirmedPassword) {
      this.service.postSubscribe(new SubscribeAccount(
        this.username,
        this.email,
        this.firstName,
        this.lastName,
        this.birthday,
        this.phone,
        this.address,
        this.city,
        this.photo,
        this.password
      )).subscribe(
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
    } else {
      this.error = 'passwords not match';
    }
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
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

}
