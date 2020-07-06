import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SERVER} from '../../app.constants';

export const AUTHENTICATED_USER = 'AuthenticatedUser';
export const TOKEN = 'token';

export class LoginAccount {

  public id: string;

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
    return this.http.post<LoginAccount>(SERVER + 'login', account).pipe(
      map(
        data =>
            {
              sessionStorage.setItem(TOKEN, 'Bearer ' + data);
              sessionStorage.setItem(AUTHENTICATED_USER, account.username);
              return data;
            }
      )
    );
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


  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }


  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }


  isUserloggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }
}






