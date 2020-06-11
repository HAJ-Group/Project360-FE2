import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserDataService} from '../data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthenticationInterceptorService  implements HttpInterceptor{

  constructor(
    private userDataService: UserDataService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const jwtAuthenticationHeader = this.userDataService.getAuthenticatedToken();
    const username = this.userDataService.getAuthenticatedUser();

    if (jwtAuthenticationHeader && username){
      request = request.clone(
        {
          setHeaders: {
            Authorization: jwtAuthenticationHeader
          }
        }
      );
    }
    return next.handle(request);
  }
}
