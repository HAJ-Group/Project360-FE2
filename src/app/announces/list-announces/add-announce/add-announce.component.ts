import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CITIES, STATES, TYPES} from '../../../app.constants';
import {AnnounceModel} from '../../../model.ts/announce-model';
import {AnnonceDataService} from '../../../service/data/annonce-data.service';
import {AnnounceImagesComponent} from './announce-images/announce-images.component';
import {AuthenticationService} from '../../../service/authentication.service';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {environment} from '../../../../environments/environment.prod';


@Component({
  selector: 'app-add-announce',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.css']
})
export class AddAnnounceComponent implements OnInit, AfterViewInit {

  cities: string[] = CITIES;
  types: string[] = TYPES;
  states: string[] = STATES;
  announce: AnnounceModel;
  selectedFiles: [] = [];
  requiredImages;

  @ViewChild(AnnounceImagesComponent) child;

  constructor(
    private announceDataService: AnnonceDataService,
    public auth: AuthenticationService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.announce =
      new AnnounceModel(1, '', '', '', 0, '', '', '', '', '', 0, 0, 0, false, 0);
    //MAPBOX
    (Mapboxgl as any).accessToken = environment.mapboxkey;
    this.map = new Mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-5.0060804, 34.0421561], // starting position
      zoom: 13 // starting zoom
    });
    this.map.on('click', function (e) {
      let v = e.lngLat.wrap();
      // @ts-ignore
      document.getElementById('pos').value = v['lng'] + ',' + v['lat'];
    });
    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken, // Set the access token
      placeholder: '     Search' ,
      mapboxgl: Mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
    });
    // Add zoom and rotation controls to the map.
    this.map.addControl(geocoder);
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.map.addControl(new Mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    this.map.addControl(new MapboxDirections({
        accessToken: Mapboxgl.accessToken
      }),
      'top-left');
  }

  ngAfterViewInit(){
    this.selectedFiles = this.child.selectedFiles;
    this.requiredImages = this.child.images;
  }

  addAnnounce() {
    // @ts-ignore
    this.announce.position_map = document.getElementById('pos').value;
    console.log(this.announce.position_map);
    this.initErrors();
    this.announceDataService.createAnnounce(this.auth.getAuthenticatedUser(), this.announce, this.selectedFiles).subscribe(
      success => {
        console.log(success);
        this.router.navigate(['dashboard', { outlets: { dashboard: ['announces'] } }]);
      },
      error => {
        console.log(error);
        if (typeof error.error === 'object') {
          // tslint:disable-next-line:forin
          for (const e in error.error) {
            document.getElementById('announce-' + e + '-error').innerHTML = error.error[e][0];
          }
        }
      }
    );

    /*
    this.announceDataService.storeImage(this.selectedFiles).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );*/
  }


  initErrors(): void {
    const elements = document.getElementsByClassName('text-danger');
    // @ts-ignore
    for (const element of elements) {
      element.innerHTML = null;
    }
  }

  show() {
    console.log(this.announce);
  }

  onClick(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  //MAP MANAGEMENT
  // MAP MANAGEMENT
  map: Mapboxgl.Map;
  markers = [] ;

  createMarker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      const coordinates = document.getElementById('coordinates');
      coordinates.style.display = 'block';
      coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }

    marker.on('drag', () => {
      console.log(marker.getLngLat());
    });
    marker.on('drag', onDragEnd);

    this.markers.push(marker);
  }

  searchMapCity() {
    try {
      // @ts-ignore
      document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value = this.announce.city
    } catch (e) {}
  }
}
