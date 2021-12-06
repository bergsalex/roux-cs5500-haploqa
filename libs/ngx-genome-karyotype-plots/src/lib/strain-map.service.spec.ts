import { TestBed } from '@angular/core/testing';

import { StrainMapService } from './strain-map.service';

describe('StrainMapService', () => {
  let service: StrainMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrainMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
