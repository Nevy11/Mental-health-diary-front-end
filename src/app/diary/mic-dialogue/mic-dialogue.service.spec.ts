import { TestBed } from '@angular/core/testing';

import { MicDialogueService } from './mic-dialogue.service';

describe('MicDialogueService', () => {
  let service: MicDialogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicDialogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
