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
   * @param state
   */
  routeTo(component, outlet, reload=false, state =null): void {
    if(reload) {
      let loader = document.getElementById('loader');
      loader.classList.remove('d-none');
    }
    if(state != null) this.router.navigateByUrl(outlet + '/(' + outlet + ':' + component + ')', state);
    else this.router.navigateByUrl(outlet + '/(' + outlet + ':' + component + ')');
    if(reload) location.href = '#/' + outlet + '/(' + outlet + ':' + component + ')';
  }


  defaultRoute(component, reload=false, state=null): void {
    if(reload) {
      let loader = document.getElementById('loader');
      loader.classList.remove('d-none');
    }
    if(state != null) this.router.navigate([component], state);
    else this.router.navigate([component]);
    if(reload){
      location.href = '#/' + component;
    }
    window.location.reload();
  }

}
