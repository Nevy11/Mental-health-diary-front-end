import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayRadioComponent } from './day-radio.component';

describe('DayRadioComponent', () => {
  let component: DayRadioComponent;
  let fixture: ComponentFixture<DayRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
