import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeSettingsComponent } from './large-settings.component';

describe('LargeSettingsComponent', () => {
  let component: LargeSettingsComponent;
  let fixture: ComponentFixture<LargeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
