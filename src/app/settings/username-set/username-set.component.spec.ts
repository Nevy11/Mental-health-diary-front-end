import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameSetComponent } from './username-set.component';

describe('UsernameSetComponent', () => {
  let component: UsernameSetComponent;
  let fixture: ComponentFixture<UsernameSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernameSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
