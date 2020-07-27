import { TestBed } from '@angular/core/testing';

import { NamedRouterService } from './named-router.service';

describe('NamedRouterService', () => {
  let service: NamedRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamedRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
