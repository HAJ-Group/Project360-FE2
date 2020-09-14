import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnnoncerModel} from '../../model.ts/annoncer-model';

const SERVER = 'http://localhost:8000/api/annoncer';
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
}
