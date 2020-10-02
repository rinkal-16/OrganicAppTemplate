import { TestBed } from '@angular/core/testing';

import { ForgetPswdService } from './forget-pswd.service';

describe('ForgetPswdService', () => {
  let service: ForgetPswdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetPswdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
