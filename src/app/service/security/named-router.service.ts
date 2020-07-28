import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NamedRouterService {

  constructor(private router: Router) { }

  /**
   * Note that the parent component should be named the same as the outlet
   * @param component
   * @param outlet
   * @param reload
   */
  routeTo(component, outlet, reload=false): void {
    if(reload) {
      let loader = document.getElementById('loader');
      loader.classList.remove('d-none');
    }
    this.router.navigateByUrl(outlet + '/(' + outlet + ':' + component + ')');
    if(reload) location.href = "/" + outlet + '/(' + outlet + ':' + component + ')';
  }


  defaultRoute(component, reload=false): void {
    if(reload) {
      let loader = document.getElementById('loader');
      loader.classList.remove('d-none');
    }
    this.router.navigate([component]);
    if(reload) location.href = '/' + component;
  }

}
