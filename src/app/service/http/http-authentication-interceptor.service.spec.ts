import { TestBed } from '@angular/core/testing';

import { HttpAuthenticationInterceptorService } from './http-authentication-interceptor.service';

describe('HttpAuthenticationInterceptorService', () => {
  let service: HttpAuthenticationInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAuthenticationInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
