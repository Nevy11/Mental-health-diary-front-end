import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiDisplayComponent } from './ai-display.component';

describe('AiDisplayComponent', () => {
  let component: AiDisplayComponent;
  let fixture: ComponentFixture<AiDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
