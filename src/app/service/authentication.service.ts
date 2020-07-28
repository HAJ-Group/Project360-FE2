import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from './data/user-data.service';
import {NamedRouterService} from './security/named-router.service';

export const AUTHENTICATED_USER = 'user';
export const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router, private n_router : NamedRouterService, private auth: UserDataService) { }

  public authenticate(username, user): void {
    let loader = document.getElementById('loader');
    loader.classList.remove('d-none');
    sessionStorage.setItem('token', 'Bearer ' + user.token);
    sessionStorage.setItem('user', username);
    sessionStorage.setItem('role', user.role);
    /*this.router.navigate(['dashboard']);
    window.location.reload();*/
    this.n_router.defaultRoute('dashboard', true);
  }

  public logout(): void {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    this.n_router.defaultRoute('', true);
  }

  public isAuthenticated(): boolean {
    return (sessionStorage.getItem(AUTHENTICATED_USER) !== null && Object.keys(this.auth.getUser()).length !== 0);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }


  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

}
