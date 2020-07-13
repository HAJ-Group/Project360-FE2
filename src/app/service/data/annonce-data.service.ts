import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AnnounceModel} from '../../model.ts/announce-model';
import {SERVER} from '../../app.constants';


@Injectable()
export class AnnonceDataService{

  private headers;
  private annonces: any[];
  private a: any;

  constructor(
    private http: HttpClient
  ) {}


  getAnnonces(): Observable<AnnounceModel[]> {
    return this.http.get<AnnounceModel[]>(SERVER + 'annonce/');
  }

  getUserAnnonces() {
    return this.http.get<AnnounceModel[]>(SERVER + '/user');
  }


  getPremiumAnnonces(): Observable<AnnounceModel[]> {
    return this.http.get<AnnounceModel[]>(SERVER + 'annonce/premium');
  }

  showAnnonce(id) {
    return this.http.get<AnnounceModel>(SERVER + 'annonce/' + id);

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

    return this.http.post(SERVER + `users/${username}/announces`,
      formData
      );
  }


/*
  storeImage(images){
    const fd = new FormData();
    for (let i = 0; i < images.length; i ++){
      fd.append('image' + ( i + 1), images[i], images[i].name);
    }
    return this.http.post(SERVER + 'users/jaouad/announces/storeImage', fd);
  }
*/

  getSpecificAnnounces($username){
    return this.http.get<AnnounceModel[]>(SERVER + `users/${$username}/announces`);
  }


}

