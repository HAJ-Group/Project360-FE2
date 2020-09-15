import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {ContactService, Contactus} from '../service/contact.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {NamedRouterService} from '../service/security/named-router.service';
import {AnnoncerDataService} from '../service/data/annoncer-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  team = [
    { name : 'Ennouinou Alaeddinne',
      job : 'developer',
      age : '22' ,
      rating : 'I did this with love ' ,
      photo : 'ennouinou.jpg' ,
      linkedin : 'https://www.linkedin.com/in/alae-ennouinou-50103a180/' ,
      github : ''
    },
    { name : 'Ismaili Alaoui Hamza',
      job : 'developer',
      age : '22',
      rating : 'I did this with love ' ,
      photo : 'hmz.jpeg' ,
      linkedin : '' ,
      github : ''
    },
    { name : 'Es-safi rhita',
      job : 'developer',
      age : '22' ,
      rating : 'I did this with love ' ,
      photo : 'rhitaEs-safi.jpeg' ,
      linkedin : '' ,
      github : ''
    },
    { name : 'Berbeche Yahya',
      job : 'developer',
      age : '22',
      rating : 'I did this with love ',
      photo : 'brbch.jpg' ,
      linkedin : '' ,
      github : ''
    },
    { name : 'Ait Assou Jaouad',
      job : 'developer',
      age : '22' ,
      rating : 'I did this with love ' ,
      photo : 'salon.jpg' ,
      linkedin : '' ,
      github : ''
    },

    {
      name : 'Bourkha Ibtissam',
      job : 'developer',
      age : '22' ,
      rating : 'I did this with love ',
      photo : 'bety.jpeg',
      linkedin : '',
      github : ''
    },
    {
      name : 'El Hamzi Houssam',
      job : 'developer',
      age : '22' ,
      rating : 'I did this with love ' ,
      photo : 'hamzi.jpeg' ,
      linkedin : '',
      github : ''
    },
  ];
  // SIDE MENU BAR -------------------------------------------------------------------------------------------------------------------------
  currentNavItem = 2;
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
    public n_router: NamedRouterService,
    public contactService: ContactService,
    public service: AnnoncerDataService
  ) {}

  ngOnInit(): void {
    this.service.getUserAnnouncer().subscribe(
      success => {
        this.profilePicture = success.picture;
        if(Object.keys(success).length === 0) this.n_router.defaultRoute('wizard', true);
      }
    );
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
