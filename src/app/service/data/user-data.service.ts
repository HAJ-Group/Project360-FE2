import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SERVER} from '../../app.constants';

export class LoginAccount {

  public id: string;
  public token: string;
  public role: string;

  constructor(
    public username: string,
    public password: string,
  ){}

}

export class SubscribeAccount  {

  public id: string;

  constructor(
      public username: string,
      public email: string,
      public password: string,
      // tslint:disable-next-line:variable-name
      public confirm_password: string,
      public role: string,
    ) {}

}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  postLogin(account) {
    return this.http.post<LoginAccount>(SERVER + 'login', account);
  }

  postSubscribe(account) {
    return this.http.post<SubscribeAccount>(SERVER + 'subscribe', account);
  }

  postConfirm(userID) {
    return this.http.post(SERVER + 'smc/' + userID, null);
  }

  getConfirm(username, code) {
    return this.http.get(SERVER + 'confirm/' + username + '/' + code);
  }




}






