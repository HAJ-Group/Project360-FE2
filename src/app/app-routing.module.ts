import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouteGuardService} from './service/security/route-guard.service';
import {ReverseRouteGuardService} from './service/security/reverse-route-guard.service';
import {DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';
import {ProfileComponent} from './dashboard/profile/profile.component';
import {AddAnnounceComponent} from './announces/list-announces/add-announce/add-announce.component';
import {EditAnnounceComponent} from './announces/list-announces/edit-announce/edit-announce.component';
import {ListAnnouncesComponent} from './announces/list-announces/list-announces.component';
import {AnnounceDetailsComponent} from './announces/list-announces/announce-details/announce-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [ReverseRouteGuardService]},
  {path: 'dashboard', component : DashboardComponent , children : [
      {path: '', component: DashboardHomeComponent, outlet: 'dashboard-content'},
      {path: 'profile', component: ProfileComponent, outlet: 'dashboard-content'},
    ], canActivate: [RouteGuardService]},

  {path: 'announces', children: [
      {path: '', component: ListAnnouncesComponent},
      {path: 'add-announce', component: AddAnnounceComponent},
      {path: 'edit-announce', component: EditAnnounceComponent},
      {path: ':id', component: AnnounceDetailsComponent},
      {path: ':id/edit-announce', component: EditAnnounceComponent}
    ], canActivate: [RouteGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
