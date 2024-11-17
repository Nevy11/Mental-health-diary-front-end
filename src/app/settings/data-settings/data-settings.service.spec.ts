import { TestBed } from '@angular/core/testing';

import { DataSettingsService } from './data-settings.service';

describe('DataSettingsService', () => {
  let service: DataSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
