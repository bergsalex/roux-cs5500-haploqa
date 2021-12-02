import { TestBed } from '@angular/core/testing';

import { SvgToolsService } from './svg-tools.service';

describe('SvgAxesService', () => {
  let service: SvgToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
