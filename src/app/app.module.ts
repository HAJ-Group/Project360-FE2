import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnnonceDataService} from './service/data/annonce-data.service';
import {AnnoncerDataService} from './service/data/annoncer-data.service';
import {OktaAuthModule} from '@okta/okta-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpAuthenticationInterceptorService} from './service/http/http-authentication-interceptor.service';
import { AddAnnounceComponent } from './announces/list-announces/add-announce/add-announce.component';
import { EditAnnounceComponent } from './announces/list-announces/edit-announce/edit-announce.component';
import { ListAnnouncesComponent } from './announces/list-announces/list-announces.component';
import { AnnounceImagesComponent } from './announces/list-announces/add-announce/announce-images/announce-images.component';
import { AnnounceDetailsComponent } from './announces/list-announces/announce-details/announce-details.component';

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
    AnnounceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule,
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
