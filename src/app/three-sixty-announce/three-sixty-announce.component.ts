import { Component, OnInit } from '@angular/core';
import * as threeApp from '../../assets/threeJS/app.js'
import {AuthenticationService} from '../service/authentication.service';
import {AnnonceDataService} from '../service/data/annonce-data.service';
import {AnnounceModel} from '../model.ts/announce-model';
import {ActivatedRoute, Router} from '@angular/router';
import {SERVER_IMAGES_PATH} from '../app.constants';
import {AnnoncerModel} from '../model.ts/annoncer-model';
import {NamedRouterService} from '../service/security/named-router.service';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {environment} from '../../environments/environment.prod';


@Component({
  selector: 'app-three-sixty-announce',
  templateUrl: './three-sixty-announce.component.html',
  styleUrls: ['./three-sixty-announce.component.css']
})
export class ThreeSixtyAnnounceComponent implements OnInit {

  error: string;
  announce: AnnounceModel;
  user: Object;
  announcer : AnnoncerModel;
  path = SERVER_IMAGES_PATH;

  constructor(public auth: AuthenticationService, public service:AnnonceDataService, public route: ActivatedRoute, public s_router: Router, public n_router: NamedRouterService) { }

  ngOnInit(): void {
    this.initAnnounce();
    //MAPBOX
    (Mapboxgl as any).accessToken = environment.mapboxkey;
    this.map = new Mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-5.0060804, 34.0421561], // starting position
      zoom: 13 // starting zoom
    });
    this.map.on('mousemove', function (e) {
      console.log(JSON.stringify(e.point) + '-' + JSON.stringify(e.lngLat.wrap()))
    });
    document.getElementById('th').click();

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


  initAnnounce() {
    this.service.getAnnounceByID(this.route.snapshot.paramMap.get('id')).subscribe(
      success => {
        this.announce = success['data'];
        try {
          this.map.flyTo({center:[parseInt(this.announce.position_map.split(',')[0]), parseInt(this.announce.position_map.split(',')[1])]});
          this.createMarker(parseInt(this.announce.position_map.split(',')[0]), parseInt(this.announce.position_map.split(',')[1]));
        }
        catch (e) {}
        this.service.getTSTImage(this.announce.id).subscribe(
          success => {
              // @ts-ignore
            build('http://localhost:8000/' + success['data'][0].image);
            console.log(success['data'][0].image);
          },
          error => {
                // @ts-ignore
                build('assets/threeJS/maisonMono1.jpg');
                console.log(error);
          }
        );
        this.service.getAnnounceUser(this.announce.id).subscribe(
          success => {
            this.user = success;
            // @ts-ignore
            this.path += this.user.username + '/';
            console.log("baaa");
          }
        );
        this.service.getAnnounceAnnouncer(this.announce.id).subscribe(
          success => {
            this.announcer = success;
            console.log(this.announcer);
          }
        );
      },
      error => {
        this.error = error.error;
      }
    );
  }

  fullScreen() {
    // @ts-ignore
    toggleFull();
  }
  toggled = false;
  toggle() {
    this.toggled = !this.toggled;
    if(this.toggled) {
      document.getElementById('infos').style.display = 'block';
      document.getElementById('viewmore').innerText = 'view less';
    } else {
      document.getElementById('infos').style.display = 'none';
      document.getElementById('viewmore').innerText = 'view more';
    }
  }

  mapToggle = true;
  switchToMap() {
    this.mapToggle = !this.mapToggle;
    if(this.mapToggle) {
      document.getElementById('map-mapbox').style.display = 'block';
      document.getElementById('canvasDIV').style.display = 'none';
      document.getElementById('th').innerText = 'Show Virtual View';
    }
    else {
      document.getElementById('map-mapbox').style.display = 'none';
      document.getElementById('canvasDIV').style.display = 'block';
      document.getElementById('th').innerText = 'Show Location';
    }
  }

  editAnnounce(id) {
    this.s_router.navigate(['dashboard', { outlets: { dashboard: ['announces', id, 'edit-announce'] } }]);
  }

  setAnnounceIdentifier(id) {
    // this.targetAnnounceId = id;
    localStorage.setItem('targeted', id);
  }

  deleteAnnounce(): void {
    let id = localStorage.getItem('targeted');
    console.log(`announce with id = ${id} is deleted`);
    this.service.deleteAnnounce(this.auth.getAuthenticatedUser(), id).subscribe(
      success => {
        console.log(success);
        localStorage.removeItem('targeted');
        this.n_router.routeTo('announces', 'dashboard', true);
      },
      error => {
        console.log(error);
      }
    );
  }

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

}
