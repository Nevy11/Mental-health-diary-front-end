import { TestBed } from '@angular/core/testing';

import { UsernameUpdateService } from './username-update.service';

describe('UsernameUpdateService', () => {
  let service: UsernameUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
