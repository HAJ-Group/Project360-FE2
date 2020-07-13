import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {ContactService, Contactus} from '../service/contact.service';
import {Router} from '@angular/router';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {AnnounceModel} from '../model.ts/announce-model';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // SIDE MENU BAR -------------------------------------------------------------------------------------------------------------------------
  currentNavItem = 4;
  // DUPLICATED FOOTER MANAGEMENT ----------------------------------------------------------------------------------------------------------
  subject: string;
  comment: string;
  email: string;
  // GLOBAL ERROR HANDLER MESSAGE ----------------------------------------------------------------------------------------------------------
  error: string;
  // Others --------------------------------------------------------------------------------------------------------------------------------
  toggled = false;

  username: string;
  profilePicture: string;

  constructor(
    private auth: AuthenticationService,
    public router: Router,
    public contactService: ContactService,
  ) {}

  ngOnInit(): void {
    console.log('loading dashboard');
    this.username = sessionStorage.getItem('user');
    this.cleanView();
    this.initNavs();
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

  contactUs() {
    this.initErrors();
    this.contactService.postContact(new Contactus(this.subject, this.comment, this.email)).subscribe(
      success => {
        console.log(success);
        this.router.navigate(['']);
      },
      error => {
        if (typeof error.error === 'object') {
          // tslint:disable-next-line:forin
          for (const e in error.error) {
            document.getElementById('contact-' + e + '-error').innerHTML = error.error[e][0];
          }
        } else {
          this.error = error.error;
        }

      }
    );
  }

  initNavs(): void {
    const navs = $('.nav-item');
    for (const nav of navs) {
      nav.classList.remove('active');
    }
    navs[this.currentNavItem].classList.add('active');
  }

  initErrors(): void {
    this.error = null;
    const elements = document.getElementsByClassName('text-danger');
    // @ts-ignore
    for (const e of elements) {
      e.innerHTML = null;
    }
  }

  setActiveNav(index): void {
    this.currentNavItem = index;
    this.initNavs();
  }

}
