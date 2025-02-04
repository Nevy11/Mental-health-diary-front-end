import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumSettingsComponent } from './medium-settings.component';

describe('MediumSettingsComponent', () => {
  let component: MediumSettingsComponent;
  let fixture: ComponentFixture<MediumSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
