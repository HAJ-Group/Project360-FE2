import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

export const AUTHENTICATED_USER = 'user';
export const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  public authenticate(username, user): void {
    sessionStorage.setItem('token', 'Bearer ' + user.token);
    sessionStorage.setItem('user', username);
    sessionStorage.setItem('role', user.role);
    this.router.navigate(['dashboard']);
    window.location.reload();
  }

  public logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
    window.location.reload();
  }

  public isAuthenticated(): boolean {
    return (sessionStorage.getItem('user') !== null);
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
