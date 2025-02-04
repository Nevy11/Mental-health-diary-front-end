import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSetComponent } from './email-set.component';

describe('EmailSetComponent', () => {
  let component: EmailSetComponent;
  let fixture: ComponentFixture<EmailSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
