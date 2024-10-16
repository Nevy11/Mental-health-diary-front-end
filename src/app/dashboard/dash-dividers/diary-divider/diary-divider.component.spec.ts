import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryDividerComponent } from './diary-divider.component';

describe('DiaryDividerComponent', () => {
  let component: DiaryDividerComponent;
  let fixture: ComponentFixture<DiaryDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
