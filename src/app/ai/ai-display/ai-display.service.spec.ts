import { TestBed } from '@angular/core/testing';

import { AiDisplayService } from './ai-display.service';

describe('AiDisplayService', () => {
  let service: AiDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
