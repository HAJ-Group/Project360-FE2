import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnnoncerDataService} from './service/data/annoncer-data.service';
import {OktaAuthModule} from '@okta/okta-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpAuthenticationInterceptorService} from './service/http/http-authentication-interceptor.service';
import { AddAnnounceComponent } from './announces/list-announces/add-announce/add-announce.component';
import { EditAnnounceComponent } from './announces/list-announces/edit-announce/edit-announce.component';
import { ListAnnouncesComponent } from './announces/list-announces/list-announces.component';
import { AnnounceImagesComponent } from './announces/list-announces/add-announce/announce-images/announce-images.component';
import { AnnounceDetailsComponent } from './announces/list-announces/announce-details/announce-details.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import {AnnonceDataService} from './service/data/annonce-data.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { WizardComponent } from './wizard/wizard.component';
import { MenuComponent } from './menu/menu.component';
import {CardAnnounceComponent} from './card-announce/card-announce.component';
import { ThreeSixtyAnnounceComponent } from './three-sixty-announce/three-sixty-announce.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    AddAnnounceComponent,
    EditAnnounceComponent,
    ListAnnouncesComponent,
    AnnounceImagesComponent,
    AnnounceDetailsComponent,
    DashboardHomeComponent,
    ProfileComponent,
    DashboardHeaderComponent,
    AnnoncesComponent,
    WizardComponent,
    MenuComponent,
    CardAnnounceComponent,
    ThreeSixtyAnnounceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule,
    // NgxPaginationModule
  ],
  providers: [
    AnnonceDataService,
    AnnoncerDataService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpAuthenticationInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
