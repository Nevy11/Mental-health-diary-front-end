import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDividerComponent } from './goal-divider.component';

describe('GoalDividerComponent', () => {
  let component: GoalDividerComponent;
  let fixture: ComponentFixture<GoalDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
