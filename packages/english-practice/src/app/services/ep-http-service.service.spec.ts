import { TestBed } from '@angular/core/testing';

import { EpHttpServiceService } from './ep-http-service.service';

describe('EpHttpServiceService', () => {
  let service: EpHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
