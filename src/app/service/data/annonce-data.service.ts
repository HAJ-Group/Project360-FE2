import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AnnounceModel} from '../../model.ts/announce-model';


const SERVER = 'http://localhost:8000/api/annonces';

@Injectable()
export class AnnonceDataService{

  private headers;
  private annonces: any[];
  private a: any;

  constructor(
    private http: HttpClient
  ) {}


  getAnnonces(): Observable<AnnounceModel[]> {
    return this.http.get<AnnounceModel[]>(SERVER + '/');
  }

  getUserAnnonces() {
    return this.http.get<AnnounceModel[]>(SERVER + '/user');
  }


  getPremiumAnnonces(): Observable<AnnounceModel[]> {
    return this.http.get<AnnounceModel[]>(SERVER + '/premium');
  }

  showAnnonce(id) {
    return this.http.get<AnnounceModel>(SERVER + '/' + id);
  }

  createAnnounce(username, announce, images) {
    const formData = new FormData();
    for (let i = 0; i < images.length; i ++){
      formData.append('image' + ( i + 1), images[i], images[i].name);
    }
    // tslint:disable-next-line:forin
    for (const field in announce){
      formData.append('' + field, announce[field]);
    }

    return this.http.post(`http://localhost:8000/api/users/${username}/announces`, formData);
  }

  getSpecificAnnounces(username){
    return this.http.get(`http://localhost:8000/api/users/${username}/announces`);
  }


  getAnnoncesByFilters(filters) {
    return this.http.post<AnnounceModel>(SERVER + '/byFilters/', filters);
  }

  retrieveAnnounce(username, id){
    return this.http.get(`http://localhost:8000/api/users/${username}/announces/${id}`);
  }
}

