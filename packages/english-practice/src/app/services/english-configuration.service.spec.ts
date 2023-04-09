import { TestBed } from '@angular/core/testing';

import { EnglishConfigurationService } from './english-configuration.service';

describe('EnglishConfigurationService', () => {
  let service: EnglishConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnglishConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
