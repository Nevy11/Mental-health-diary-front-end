import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeBraveSettingsComponent } from './large-brave-settings.component';

describe('LargeBraveSettingsComponent', () => {
  let component: LargeBraveSettingsComponent;
  let fixture: ComponentFixture<LargeBraveSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeBraveSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeBraveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
