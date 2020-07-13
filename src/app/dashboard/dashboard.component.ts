import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {ContactService, Contactus} from '../service/contact.service';
import {Router} from '@angular/router';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {AnnonceModel} from '../model.ts/annonce-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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


  initErrors(): void {
    this.error = null;
    const elements = document.getElementsByClassName('text-danger');
    // @ts-ignore
    for (const e of elements) {
      e.innerHTML = null;
    }
  }
  profile(){
    console.log('kjskljsdklj');
    this.router.navigateByUrl('/dashboard/(dashboard-content:profile');
    //this.router.navigate(['dashboard/profile']);
  }
}
