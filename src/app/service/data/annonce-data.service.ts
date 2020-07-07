import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AnnounceModel} from '../../model.ts/announce-model';
import {SERVER} from '../../app.constants';


@Injectable()
export class AnnonceDataService{

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

  getAnnonces(): Observable<AnnounceModel[]> {
    return this.http.get<AnnounceModel[]>(SERVER + 'annonce/', {headers: this.headers});
  }


  getPremiumAnnonces(): Observable<AnnounceModel[]> {
    return this.http.get<AnnounceModel[]>(SERVER + 'annonce/premium', {headers: this.headers});
  }


  createAnnonce(username, announce) {
    return this.http.post<AnnounceModel>(SERVER + `users/${username}/annonce/`, announce);
  }

  showAnnonce(id) {
    return this.http.get<AnnounceModel>(SERVER + 'annonce/' + id);

  }

}

