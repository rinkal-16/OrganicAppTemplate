import { TestBed } from '@angular/core/testing';

import { ResetPswdService } from './reset-pswd.service';

describe('ResetPswdService', () => {
  let service: ResetPswdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPswdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
