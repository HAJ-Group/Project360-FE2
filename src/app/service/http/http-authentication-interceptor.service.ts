import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthenticationInterceptorService  implements HttpInterceptor{

  constructor(
    private auth: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const jwtAuthenticationHeader = this.auth.getAuthenticatedToken();
    const username = this.auth.getAuthenticatedUser();

    if (jwtAuthenticationHeader && username){
      request = request.clone(
        {
          setHeaders: {
            Authorization: jwtAuthenticationHeader,
          }
        }
      );
    }
    return next.handle(request);
  }
}
