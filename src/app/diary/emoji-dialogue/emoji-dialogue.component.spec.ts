import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiDialogueComponent } from './emoji-dialogue.component';

describe('EmojiDialogueComponent', () => {
  let component: EmojiDialogueComponent;
  let fixture: ComponentFixture<EmojiDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojiDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
