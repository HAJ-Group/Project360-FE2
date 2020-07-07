import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AnnonceModel} from '../../model.ts/annonce-model';

const SERVER = 'http://localhost:8000/api/annonce';

@Injectable()
export class AnnonceDataService {

  private accessToken = 'ZmEde6zyCqqNHY2A4qwl6jpwTX2r79eTciAeOgcZ';
  private headers;
  private annonces: any[];
  private a: any;

  constructor(
    private http: HttpClient
  ) {
    this.init();
  }


  private async init() {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  getAnnonces(): Observable<AnnonceModel[]> {
    return this.http.get<AnnonceModel[]>(SERVER + '/', {headers: this.headers});
  }


  getPremiumAnnonces(): Observable<AnnonceModel[]> {
    return this.http.get<AnnonceModel[]>(SERVER + '/premium', {headers: this.headers});
  }


  createAnnonce(annonce) {
    return this.http.post<AnnonceModel>(SERVER + '/', annonce);

  }

  showAnnonce(id) {
    return this.http.get<AnnonceModel>(SERVER + '/' + id);

  }

}
