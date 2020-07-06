import { Component, OnInit } from '@angular/core';
import {LoginAccount, SubscribeAccount, UserDataService} from '../service/data/user-data.service';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // LOGIN AND SUBSCRIBE -------------------------------------------------------------------------------------------------------------------
  username: string;
  email: string;
  password: string;
  // tslint:disable-next-line:variable-name
  confirm_password: string;
  code: string;
  // GLOBAL ERROR HANDLER MESSAGE ----------------------------------------------------------------------------------------------------------
  error: string;
  // Others --------------------------------------------------------------------------------------------------------------------------------
  toggled = false;

  constructor(
    private service: UserDataService,
    public router: Router
  ) {
  }

  static getCheckedRole(): string {
    const elements = document.getElementsByName('job');
    // @ts-ignore
    for (const element of elements) {
      if (element.checked) {
        if (element.id === 'agent') {
          return '3';
        } else {
          return '2';
        }
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.scrollNav();
    if (sessionStorage.getItem('username') !== null) {
      document.getElementById('continue').classList.remove('d-none');
      this.username = sessionStorage.getItem('username');
    } else {
      document.getElementById('continue').classList.add('d-none');
    }
  }

  login() {
    this.initErrors();
    this.service.postLogin(new LoginAccount(this.username, this.password)).subscribe(
      success => {
        // success is the token
        console.log(success);
        localStorage.setItem('token', 'Bearer ' + success);
        sessionStorage.setItem('user', this.username);
        this.router.navigate(['']);
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
        sessionStorage.setItem('username', this.username);
        this.showConfirmationBlock();
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

  sendConfirmation(): void {
    this.initErrors();
    if (sessionStorage.getItem('username') !== null) {
      console.log('sending confirmation to user ' + sessionStorage.getItem('username'));
      console.log(sessionStorage.getItem('username'));
      this.service.postConfirm(sessionStorage.getItem('username')).subscribe(
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
    if (sessionStorage.getItem('username') !== null) {
      console.log('confirming user ' + sessionStorage.getItem('username'));
      console.log(this.code);
      this.service.getConfirm(sessionStorage.getItem('username'), this.code).subscribe(
        success => {
          console.log(success);

          // Hiding subscription modal and showing loging modal
          $('#subscribe').modal('hide');
          $('#login').modal('show');

        },
        error => {
          console.log(error.error);
          if (typeof error.error === 'object') {
            this.error = error.error.message;
          } else {
            this.error = error.error;
          }
        }
      );
    } else {
      console.log('session values timed out');
    }
  }

  logout(): void {
    console.log('logging off from user ' + sessionStorage.getItem('username'));
    sessionStorage.removeItem('username');
    this.router.navigate(['']);
  }

  toggle(): void {
    if (window.innerWidth > 700) {
      this.toggled = !this.toggled;
      if (this.toggled) {
        document.getElementById('header-description').style.display = 'none';
      } else {
        document.getElementById('header-description').style.display = 'block';
      }
    }
  }

  toggleClick(): void {
    const elements = document.getElementsByName('job');
    // @ts-ignore
    for (const element of elements) {
      if (element.checked) {
        if (element.id === 'agent') {
          document.getElementById('agent-desc').classList.remove('text-muted');
          document.getElementById('announcer-desc').classList.add('text-muted');
        } else {
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
  }

  initErrors(): void {
    this.error = null;
    const elements = document.getElementsByClassName('text-danger');
    // @ts-ignore
    for (const e of elements) {
      e.innerHTML = null;
    }
  }

  scrollNav(): void {
    // @ts-ignore
    $(window).scroll(() => {
      if ($('.navbar').offset().top > 50) {
        $('.fixed-top').addClass('top-nav-collapse');
      } else {
        $('.fixed-top').removeClass('top-nav-collapse');
      }
    });
  }
}
