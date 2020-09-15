import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AnnounceModel} from '../../model.ts/announce-model';
import {SERVER_USERS} from '../../app.constants';
import {AnnoncerModel} from '../../model.ts/annoncer-model';


const SERVER = 'https://radiant-anchorage-91157.herokuapp.com/api/annonces';

@Injectable()
export class AnnonceDataService{

  private annonces: any[];
  private a: any;

  constructor(
    private http: HttpClient
  ) {}


  getAnnonces(): Observable<AnnounceModel[]> {
    return this.http.get<AnnounceModel[]>(SERVER);
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
    console.log('announce: ' + announce);
    const formData = new FormData();
    for (let i = 0; i < images.length; i ++){
      formData.append('image' + ( i + 1), images[i], images[i].name);
    }
    // tslint:disable-next-line:forin
    for (const field in announce){
      formData.append('' + field, announce[field]);
    }

    return this.http.post(SERVER_USERS + `${username}/announces`, formData);
  }

  getSpecificAnnounces(username){
    return this.http.get<AnnounceModel[]>(SERVER_USERS + `${username}/announces`);
  }

  getAnnounceUser(id) {
    return this.http.get(SERVER + '/' + id + '/user');
  }

  getAnnounceAnnouncer(id) {
    return this.http.get<AnnoncerModel>(SERVER + '/' + id + '/annoncer');
  }

  getAnnounceByID(id) {
    return this.http.get<AnnounceModel>(SERVER + '/' + id);
  }

  getAnnoncesByFilters(filters) {
    return this.http.post<AnnounceModel[]>(SERVER + '/byFilters', filters);
  }

  retrieveAnnounce(authenticatedUser: string, id: any){
    return this.http.get(SERVER_USERS + `${authenticatedUser}/announces/${id}`);
  }

  deleteAnnounce(authenticatedUser: string, id: any) {
    return this.http.delete(SERVER_USERS + `${authenticatedUser}/announces/${id}`);
  }

  updateAnnounce(authenticatedUser, announce, images) {

    const formData = new FormData();
    for (let i = 0; i < images.length; i ++){
      formData.append('image' + ( i + 1), images[i], images[i].name);
    }
    // tslint:disable-next-line:forin
    for (const field in announce){
      formData.append('' + field, announce[field]);
    }

    // Normally, the data will be send with a body that has a 'form-data' structure
    // witch doesn't work with the PUT method (it require a 'x-www-form-urlencoded' form)
    // so, as a solution, we send a post request with the formData object of JS and attach
    // the '_method' field to it with 'PUT' value.
    formData.append('_method', 'PUT');

    return this.http.post(SERVER_USERS + `${authenticatedUser}/announces/${announce.id}`,
      formData);
  }
}

