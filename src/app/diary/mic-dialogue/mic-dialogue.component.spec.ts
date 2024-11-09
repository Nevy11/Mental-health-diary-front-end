import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicDialogueComponent } from './mic-dialogue.component';

describe('MicDialogueComponent', () => {
  let component: MicDialogueComponent;
  let fixture: ComponentFixture<MicDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
