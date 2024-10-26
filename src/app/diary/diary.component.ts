import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatHint } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EmojiDialogueComponent } from './emoji-dialogue/emoji-dialogue.component';

@Component({
  selector: 'diary-diary',
  standalone: true,
  imports: [
    MatHint,
    MatLabel,
    MatFormField,
    MatMenuModule,
    MatInputModule,
    PickerModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryComponent {
  diaryEntry: string = '';
  showEmojiPicker = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  // dialogue
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(EmojiDialogueComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
