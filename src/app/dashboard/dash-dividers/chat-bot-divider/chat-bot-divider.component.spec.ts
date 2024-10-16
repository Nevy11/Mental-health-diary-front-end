import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotDividerComponent } from './chat-bot-divider.component';

describe('ChatBotDividerComponent', () => {
  let component: ChatBotDividerComponent;
  let fixture: ComponentFixture<ChatBotDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
