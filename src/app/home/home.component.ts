import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly URL = 'http://localhost:8000';

  annonces: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.annonces = this.http.get(URL + '');
  }

}
