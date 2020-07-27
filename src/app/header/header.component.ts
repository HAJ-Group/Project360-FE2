import { Component, OnInit } from '@angular/core';
import {LoginAccount, SubscribeAccount, UserDataService} from '../service/data/user-data.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  auto_confirm = false;
  // LOGIN AND SUBSCRIBE -------------------------------------------------------------------------------------------------------------------
  username: string;
  email: string;
  password: string;
  keyword: string;
  // tslint:disable-next-line:variable-name
  confirm_password: string;
  code: string;
  // GLOBAL ERROR HANDLER MESSAGE ----------------------------------------------------------------------------------------------------------
  error: string;
  // Others --------------------------------------------------------------------------------------------------------------------------------
  toggled = false;

  constructor(
    private auth: AuthenticationService,
    private service: UserDataService,
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
    if (this.auth.isAuthenticated()) {
      document.getElementById('continue').classList.remove('d-none');
    } else {
      document.getElementById('continue').classList.add('d-none');
    }
  }

  facebook_login() {
    // @ts-ignore
    FBlogin();
    this.username = sessionStorage.getItem('FB_NAME').split(' ').join('_');
    this.password = 'FB' + sessionStorage.getItem('FB_EMAIL') + sessionStorage.getItem('FB_ID');
    if(this.password.length > 30) this.password = this.password.substring(0, 30);
    sessionStorage.removeItem('FB_ID');
    sessionStorage.removeItem('FB_NAME');
    sessionStorage.removeItem('FB_EMAIL');
    sessionStorage.removeItem('FB_TOKEN');
    this.login();
  }

  login() {
    this.initErrors();
    this.service.postLogin(new LoginAccount(this.username, this.password)).subscribe(
      success => {
        // success is the token
        console.log(success);
        this.auth.authenticate(this.username, success);
      },
      error => {
        console.log(error.error);
        if (typeof error.error === 'object') {
          // tslint:disable-next-line:forin
          for (const e in error.error) {
            document.getElementById('login-' + e + '-error').innerHTML = error.error[e][0];
          }
        } else {
          this.error = error.error;
        }
      }
    );
  }

  facebook_subscribe() {
    // @ts-ignore
    FBlogin();
    this.username = sessionStorage.getItem('FB_NAME').split(' ').join('_');
    this.email = sessionStorage.getItem('FB_EMAIL');
    this.password = 'FB' + this.email + sessionStorage.getItem('FB_ID');
    if(this.password.length > 30) this.password = this.password.substring(0, 30);
    this.confirm_password = this.password;
    sessionStorage.removeItem('FB_ID');
    sessionStorage.removeItem('FB_NAME');
    sessionStorage.removeItem('FB_EMAIL');
    sessionStorage.removeItem('FB_TOKEN');
    this.auto_confirm = true;
    this.subscribe();
  }

  subscribe() {
    this.initErrors();
    this.service.postSubscribe(new SubscribeAccount(
      this.username,
      this.email,
      this.password,
      this.confirm_password,
      HeaderComponent.getCheckedRole()
    )).subscribe(
      success => {
        console.log(success);
        sessionStorage.setItem('user', this.username);
        if (this.auto_confirm) {
          this.service.cancelCode(success[1]).subscribe(
            success => {
              this.code = '0';
              this.confirm();
            }
          );
        }
        else this.showConfirmationBlock();
      },
      error => {
        console.log(error.error);
        if (typeof error.error === 'object') {
          // tslint:disable-next-line:forin
          for (const e in error.error) {
            document.getElementById('subscribe-' + e + '-error').innerHTML = error.error[e][0];
          }
        } else {
          this.error = error.error;
        }
      }
    );
  }

  logout(): void {
    this.auth.logout();
  }

  sendConfirmation(): void {
    this.initErrors();
    if (this.auth.isAuthenticated()) {
      console.log('sending confirmation to user ' + this.username);
      this.service.postConfirm(this.auth.getAuthenticatedUser()).subscribe(
        success => {
          console.log(success);
        },
        error => {
          console.log(error.error);
          this.error = error.error;
        }
      );
    } else {
      console.log('session values timed out');
    }
  }

  confirm(): void {
    this.initErrors();
    if (this.auth.isAuthenticated()) {
      console.log('confirming user ' + this.username);
      this.service.getConfirm(this.auth.getAuthenticatedUser(), this.code).subscribe(
        success => {
          console.log(success);
          this.login();
          // should route to complete subscription
        },
        error => {
          console.log(error.error);
          if (typeof error.error === 'object') {
            this.error = error.error.message;
          } else { this.error = error.error; }
        }
      );
    } else {
      console.log('session values timed out');
    }
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
    // @ts-ignore
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

  showConfirmationBlock(): void {
    document.getElementById('header-inscription').classList.add('d-none');
    document.getElementById('body-inscription').classList.add('d-none');
    document.getElementById('footer-inscription').classList.add('d-none');
    document.getElementById('header-confirmation').classList.remove('d-none');
    document.getElementById('body-confirmation').classList.remove('d-none');
    document.getElementById('footer-confirmation').classList.remove('d-none');
  }

  rollback(): void {
    document.getElementById('header-inscription').classList.remove('d-none');
    document.getElementById('body-inscription').classList.remove('d-none');
    document.getElementById('footer-inscription').classList.remove('d-none');
    document.getElementById('header-confirmation').classList.add('d-none');
    document.getElementById('body-confirmation').classList.add('d-none');
    document.getElementById('footer-confirmation').classList.add('d-none');
    document.getElementById('continue').classList.remove('d-none');
  }

  initErrors(): void {
    this.error = null;
    const elements = document.getElementsByClassName('text-danger');
    // @ts-ignore
    for (const e of elements) {
      e.innerHTML = null;
    }
  }

  getSearchKey() {
    this.router.navigate(['/annonces'], {state: {keyword: this.keyword}});
  }

}
