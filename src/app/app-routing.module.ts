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
import {AnnoncesComponent} from './annonces/annonces.component';
import {WizardComponent} from './wizard/wizard.component';
import {ThreeSixtyAnnounceComponent} from './three-sixty-announce/three-sixty-announce.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [ReverseRouteGuardService]},
  {path: 'annonces', component: AnnoncesComponent},
  {path: 'vview/:id', component: ThreeSixtyAnnounceComponent},
  {path: 'wizard', component: WizardComponent, canActivate: [RouteGuardService]},
  {path: 'dashboard', component : DashboardComponent , children : [
      {path: '', component: DashboardHomeComponent, outlet: 'dashboard'},
      {path: 'profile', component: ProfileComponent, outlet: 'dashboard'},
      {path: 'announces', component: ListAnnouncesComponent, outlet: 'dashboard'},
      {path: 'add-announce', component: AddAnnounceComponent, outlet: 'dashboard'},
      {path: 'announces/:id', component: AnnounceDetailsComponent, outlet: 'dashboard'},
      {path: 'edit-announce', component: EditAnnounceComponent, outlet: 'dashboard'}
    ], canActivate: [RouteGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
