import { TestBed } from '@angular/core/testing';

import { SignUpFormService } from './sign-up-form.service';

describe('SignUpFormService', () => {
  let service: SignUpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
