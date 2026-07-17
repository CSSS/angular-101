import { TestBed } from '@angular/core/testing';

import { RouteCounter } from './route-counter.service';

describe('RouteCounter', () => {
  let service: RouteCounter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteCounter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
