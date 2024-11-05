import { TestBed } from '@angular/core/testing';

import { DayRadioService } from './day-radio.service';

describe('DayRadioService', () => {
  let service: DayRadioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayRadioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
