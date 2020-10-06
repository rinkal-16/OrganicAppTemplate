import { TestBed } from '@angular/core/testing';

import { GenerateVerifyService } from './generate-verify.service';

describe('GenerateVerifyService', () => {
  let service: GenerateVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
