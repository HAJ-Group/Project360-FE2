import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouteGuardService} from './service/security/route-guard.service';
import {ReverseRouteGuardService} from './service/security/reverse-route-guard.service';
import {DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';
import {ProfileComponent} from './dashboard/profile/profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [ReverseRouteGuardService]},
  {path: 'dashboard', component : DashboardComponent , children : [
      {path: '', component: DashboardHomeComponent, outlet: 'dashboard-content'},
      {path: 'profile', component: ProfileComponent, outlet: 'dashboard-content'},
    ], canActivate: [RouteGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
