import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PasswordSetComponent } from '../password-set/password-set.component';
import { EmailSetComponent } from '../email-set/email-set.component';
import { DialogModule, Dialog, DialogRef } from '@angular/cdk/dialog';
import { UsernameDialogComponent } from './username-dialog/username-dialog.component';

@Component({
  selector: 'diary-medium-settings',
  imports: [
    MatButtonToggleModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    PasswordSetComponent,
    EmailSetComponent,
    DialogModule,
  ],
  templateUrl: './medium-settings.component.html',
  styleUrl: './medium-settings.component.scss',
})
export class MediumSettingsComponent implements OnInit {
  width = 300;
  height = 300;
  fontStyleControl = new FormControl('');
  fontStyle?: string;
  // Dialog material
  dialog = inject(Dialog);
  openDialog(): void {
    this.dialog.open<String>(UsernameDialogComponent);
  }
  ngOnInit(): void {
    if (this.fontStyleControl.value == 'Username') {
      this.openDialog();
    }
  }
}
