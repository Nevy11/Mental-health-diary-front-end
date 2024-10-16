import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDividersComponent } from './dash-dividers.component';

describe('DashDividersComponent', () => {
  let component: DashDividersComponent;
  let fixture: ComponentFixture<DashDividersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashDividersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashDividersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
