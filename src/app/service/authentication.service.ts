import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  public authenticate(username, token): void {
    localStorage.setItem('token', 'Bearer ' + token);
    sessionStorage.setItem('user', username);
    this.router.navigate(['dashboard']);
  }

  public logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    return (sessionStorage.getItem('user') !== null);
  }

}
