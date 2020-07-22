import { TestBed } from '@angular/core/testing';

import { ReverseRouteGuardService } from './reverse-route-guard.service';

describe('ReverseRouteGuardService', () => {
  let service: ReverseRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
