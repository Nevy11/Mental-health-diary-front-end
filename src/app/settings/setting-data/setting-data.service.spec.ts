import { TestBed } from '@angular/core/testing';

import { SettingDataService } from './setting-data.service';

describe('SettingDataService', () => {
  let service: SettingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
