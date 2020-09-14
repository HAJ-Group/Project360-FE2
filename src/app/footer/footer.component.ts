import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ContactService, Contactus } from '../service/contact.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 // LOGIN AND SUBSCRIBE -------------------------------------------------------------------------------------------------------------------
 subject: string;
 comment: string;
 email: string;
 // GLOBAL ERROR HANDLER MESSAGE ----------------------------------------------------------------------------------------------------------
 error: string;
 // Others --------------------------------------------------------------------------------------------------------------------------------
 toggled = false;
  // TEAM :
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
 constructor(
   private service: ContactService,
   public router: Router)
 {}


 ngOnInit(): void {
 }
 /* translate*/

 contactUs() {
  this.initErrors();
  this.service.postContact(new Contactus(this.subject, this.comment, this.email)).subscribe(
     success => {
       console.log(success);
       this.router.navigate(['']);
     },
     error => {
      console.log(error);
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
}


