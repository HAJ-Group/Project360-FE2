import { Injectable } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()) { return true; }
    this.router.navigate(['']);
    return false;
  }

}
