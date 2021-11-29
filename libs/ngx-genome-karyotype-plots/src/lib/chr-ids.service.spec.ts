import { TestBed } from '@angular/core/testing';

import { ChrIdsService } from './chr-ids.service';

describe('ChrIdsService', () => {
  let service: ChrIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChrIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO TEST: `chrSizesHash` is populated correctly by `initChrIds`

  // TODO TEST: `chrIDs` is populated correctly by `initChrIds`

  // TODO TEST: try setting minStartBp prior to calling `initChrIds`

  // TODO TEST: try setting maxEndBp prior to calling `initChrIds`
});
