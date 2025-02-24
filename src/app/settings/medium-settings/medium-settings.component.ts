import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PasswordSetComponent } from '../password-set/password-set.component';
import { DialogModule, Dialog, DialogRef } from '@angular/cdk/dialog';
import { UsernameDialogComponent } from './username-dialog/username-dialog.component';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';

@Component({
  selector: 'diary-medium-settings',
  imports: [
    MatButtonToggleModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    PasswordSetComponent,
    DialogModule,
  ],
  templateUrl: './medium-settings.component.html',
  styleUrl: './medium-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediumSettingsComponent implements OnInit {
  width = 300;
  height = 300;
  fontStyleControl = new FormControl('');
  fontStyle?: string;
  // Dialog material
  dialog = inject(Dialog);

  openDialog(): void {
    this.dialog.open<string>(UsernameDialogComponent);
  }
  openDialogEmail(): void {
    this.dialog.open<string>(UsernameDialogComponent);
  }

  ngOnInit(): void {
    if (this.fontStyleControl.value == 'Username') {
      this.openDialog();
    }
  }
}
