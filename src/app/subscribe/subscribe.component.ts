import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  birthDate: Date;
  password: string;
  passwordConfirmation: string;
  image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
