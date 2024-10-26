import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog.component';

describe('DialogContentExampleDialogComponent', () => {
  let component: DialogContentExampleDialogComponent;
  let fixture: ComponentFixture<DialogContentExampleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContentExampleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContentExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
