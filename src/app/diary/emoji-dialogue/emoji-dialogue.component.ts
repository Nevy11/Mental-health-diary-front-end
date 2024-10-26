import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'diary-emoji-dialogue',
  standalone: true,
  imports: [EmojiComponent, PickerModule, MatDialogModule, MatButtonModule],
  templateUrl: './emoji-dialogue.component.html',
  styleUrl: './emoji-dialogue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmojiDialogueComponent {
  diaryEntry: string = '';
  constructor() {
    console.log('Emoji is called');
  }
  addEmoji(event: any) {
    const emoji = event.emoji.native;
    this.diaryEntry += emoji;
  }
}
