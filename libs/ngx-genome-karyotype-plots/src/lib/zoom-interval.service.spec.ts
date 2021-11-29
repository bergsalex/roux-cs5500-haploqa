import { TestBed } from '@angular/core/testing';

import { ZoomIntervalService } from './zoom-interval.service';

describe('ZoomIntervalService', () => {
  let service: ZoomIntervalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomIntervalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
