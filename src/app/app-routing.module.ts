import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddAnnounceComponent} from './announces/list-announces/add-announce/add-announce.component';
import {EditAnnounceComponent} from './announces/list-announces/edit-announce/edit-announce.component';
import {ListAnnouncesComponent} from './announces/list-announces/list-announces.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'announces', component: ListAnnouncesComponent},
  {path: 'announces/add-announce', component: AddAnnounceComponent},
  {path: 'announces/edit-announce/:id', component: EditAnnounceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
