import { Component, OnInit } from '@angular/core';
import {NamedRouterService} from '../../service/security/named-router.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  keyword: string;

  constructor(public n_router: NamedRouterService,
              public auth:AuthenticationService,
              public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit(): void {}

  getSearchKey() {
    this.n_router.routeTo('annonces','dashboard', false, {state: {keyword: this.keyword}});
  }

}
