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

 // GLOBAL ERROR HANDLER MESSAGE ----------------------------------------------------------------------------------------------------------
 error: string;
 // Others --------------------------------------------------------------------------------------------------------------------------------
 toggled = false;

 constructor(
   private service: ContactService,
   public router: Router
 ) { }

 ngOnInit(): void {
 }

 contactUs() {
  this.initErrors();
   this.service.postContact(new Contactus(this.subject, this.comment)).subscribe(
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



}


