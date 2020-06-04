import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const SERVER = 'http://localhost:8000/api/';

export class User {

  public id: string;
  public token: string;

  constructor(
    public username: string,
    public password: string,
    public role = '1',
    public active = '1'
  ){}

}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  postLogin(user) {
    return this.http.post<User>(SERVER + 'login', user);
  }

}
