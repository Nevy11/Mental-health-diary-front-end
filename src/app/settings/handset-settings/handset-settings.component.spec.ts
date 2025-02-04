import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsetSettingsComponent } from './handset-settings.component';

describe('HandsetSettingsComponent', () => {
  let component: HandsetSettingsComponent;
  let fixture: ComponentFixture<HandsetSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandsetSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandsetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
