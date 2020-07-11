import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddAnnounceComponent} from './announces/list-announces/add-announce/add-announce.component';
import {EditAnnounceComponent} from './announces/list-announces/edit-announce/edit-announce.component';
import {ListAnnouncesComponent} from './announces/list-announces/list-announces.component';
import {AnnounceDetailsComponent} from './announces/list-announces/announce-details/announce-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'announces', children: [
      {path: '', component: ListAnnouncesComponent},
      {path: 'add-announce', component: AddAnnounceComponent},
      {path: 'edit-announce', component: EditAnnounceComponent},
      {path: ':announce_id', component: AnnounceDetailsComponent},
      {path: ':announce_id/edit-announce', component: EditAnnounceComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
