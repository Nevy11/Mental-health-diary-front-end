import { TestBed } from '@angular/core/testing';

import { AiMicService } from './ai-mic.service';

describe('AiMicService', () => {
  let service: AiMicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiMicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
