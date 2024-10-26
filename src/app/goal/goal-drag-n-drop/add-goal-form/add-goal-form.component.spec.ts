import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalFormComponent } from './add-goal-form.component';

describe('AddGoalFormComponent', () => {
  let component: AddGoalFormComponent;
  let fixture: ComponentFixture<AddGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGoalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
