import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalDragNDropComponent } from './goal-drag-n-drop.component';

describe('GoalDragNDropComponent', () => {
  let component: GoalDragNDropComponent;
  let fixture: ComponentFixture<GoalDragNDropComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalDragNDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
