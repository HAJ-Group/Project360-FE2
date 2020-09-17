import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnnoncerModel} from '../../model.ts/annoncer-model';
import {Observable} from 'rxjs';

const SERVER = 'https://radiant-anchorage-91157.herokuapp.com/api/annoncer';
@Injectable()
export class AnnoncerDataService {
  constructor(
    private http: HttpClient
  ){}
  getAnnouncers(): Observable<AnnoncerModel[]> {
    return this.http.get<AnnoncerModel[]>(SERVER);
  }
  getUserAnnouncer(): Observable<AnnoncerModel> {
    return this.http.get<AnnoncerModel>(SERVER + '/user');
  }
  updateAnnouncer(id, announcer) {
    return this.http.put<AnnoncerModel>(SERVER + '/' + id, announcer);
  }
  createAnnouncer(announcer) {
    return this.http.post<AnnoncerModel>(SERVER + '/', announcer);
  }
  postProfilePicture(picture: File, id) {
    const formData: FormData = new FormData();
    formData.append('image', picture, picture.name);
    return this.http.post(SERVER + '/uimage/' + id , formData)
  }
}
