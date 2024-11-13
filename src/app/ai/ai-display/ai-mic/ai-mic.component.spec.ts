import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMicComponent } from './ai-mic.component';

describe('AiMicComponent', () => {
  let component: AiMicComponent;
  let fixture: ComponentFixture<AiMicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiMicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiMicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
