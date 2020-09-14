import { Component, OnInit } from '@angular/core';
import {NamedRouterService} from '../../service/security/named-router.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(public n_router: NamedRouterService, public auth:AuthenticationService) { }

  ngOnInit(): void {
  }

}
