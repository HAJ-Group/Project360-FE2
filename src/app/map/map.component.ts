import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment.prod';

import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {Router} from '@angular/router';
import {AnnounceModel} from '../model.ts/announce-model';
import {CITIES} from '../app.constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: Mapboxgl.Map;
  filters = {
    keyword: '',
    status: '',
    type: '',
    city: '',
    surface: 0,
    pieces: 20,
    budget_min: 1,
    budget_max: 100000
  };

  cities: string[];
  announces: AnnounceModel[];
  markers = [] ;

  constructor(private announceData: AnnonceDataService, private router: Router) {
    this.cities = CITIES;
    const k = this.router.getCurrentNavigation().extras.state;
    this.filters.keyword = k !== undefined ? k.keyword : '';
  }

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapboxkey;
    this.map = new Mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-5.0060804, 34.0421561], // starting position
      zoom: 13 // starting zoom
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

    this.getPositions();
  }

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

  createMarkers() {
    // tslint:disable-next-line:prefer-for-of
    if (this.markers !== undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].remove();
      }
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.announces.length; i++) {
      // console.log(this.announces[i].position_map);
      const pos = this.announces[i].positionMap.split(',');
      // @ts-ignore
      this.createMarker(pos[0], pos[1]);
    }
  }

  getPositions() {
    this.announceData.getAnnonces().subscribe(data => {
      this.announces = data['1'];
      this.createMarkers();
    });

  }

  getAnnouncesByFilters() {
    this.announceData.getAnnoncesByFilters(this.filters).subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.announces = data.data;
      this.createMarkers();
    });
  }
}

