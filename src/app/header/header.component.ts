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
  static getCheckedRole(): string {
    const elements = document.getElementsByName('job');
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
      document.getElementById('header-inscription').classList.add('d-none');
      document.getElementById('body-inscription').classList.add('d-none');
      document.getElementById('footer-inscription').classList.add('d-none');
      document.getElementById('header-confirmation').classList.remove('d-none');
      document.getElementById('body-confirmation').classList.remove('d-none');
      document.getElementById('footer-confirmation').classList.remove('d-none');
      // this.service.postSubscribe(new SubscribeAccount(
      //   this.username,
      //   this.email,
      //   this.password,
      //   this.confirmedPassword,
      //   HeaderComponent.getCheckedRole()
      // )).subscribe(
      //   success => {
      //     console.log(success.token);
      //     localStorage.setItem('token', 'Bearer ' + success.token);
      //     sessionStorage.setItem('user', this.username);
      //     this.router.navigate(['']);
      //   },
      //   error => {
      //     this.error = error.message;
      //   }
      // );
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
  toggleClick(): void {
    const elements = document.getElementsByName('job');
    for ( const element of elements ) {
      if (element.checked){
        if (element.id === 'agent'){
          document.getElementById('agent-desc').classList.remove('text-muted');
          document.getElementById('announcer-desc').classList.add('text-muted');
        }
        else{
          document.getElementById('agent-desc').classList.add('text-muted');
          document.getElementById('announcer-desc').classList.remove('text-muted');
        }
      }
    }
  }

}
