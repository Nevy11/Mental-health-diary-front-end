import { TestBed } from '@angular/core/testing';

import { AddGoalService } from './add-goal.service';

describe('AddGoalService', () => {
  let service: AddGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
