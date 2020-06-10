import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ServicesService } from './footer/services.service';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnnonceDataService} from './service/data/annonce-data.service';
import {AnnonceModel} from './model.ts/annonce-model';
import {AnnoncerDataService} from './service/data/annoncer-data.service';
import {OktaAuthModule} from '@okta/okta-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [
    ServicesService,
    AnnonceDataService,
    AnnoncerDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
