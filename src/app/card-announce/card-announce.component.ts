import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-announce',
  templateUrl: './card-announce.component.html',
  styleUrls: ['./card-announce.component.css']
})
export class CardAnnounceComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  price: string;
  @Input()
  city: string;
  constructor() { }

  ngOnInit(): void {
  }

}
