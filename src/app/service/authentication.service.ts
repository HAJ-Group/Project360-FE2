import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  public authenticate(username, user): void {
    localStorage.setItem('token', 'Bearer ' + user.token);
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

}
