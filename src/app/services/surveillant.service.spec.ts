import { TestBed } from '@angular/core/testing';

import { SurveillantService } from './surveillant.service';

describe('SurveillantService', () => {
  let service: SurveillantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveillantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
