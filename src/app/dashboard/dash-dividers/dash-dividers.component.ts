import { Component } from '@angular/core';
import { GoalDividerComponent } from './goal-divider/goal-divider.component';
import { DiaryDividerComponent } from './diary-divider/diary-divider.component';
import { ChatBotDividerComponent } from './chat-bot-divider/chat-bot-divider.component';

@Component({
  selector: 'diary-dash-dividers',
  standalone: true,
  imports: [
    GoalDividerComponent,
    DiaryDividerComponent,
    ChatBotDividerComponent,
  ],
  templateUrl: './dash-dividers.component.html',
  styleUrl: './dash-dividers.component.scss',
})
export class DashDividersComponent {}
