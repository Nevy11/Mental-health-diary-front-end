import { Component } from '@angular/core';
import { GoalDragNDropComponent } from './goal-drag-n-drop/goal-drag-n-drop.component';
import { DayRadioComponent } from './day-radio/day-radio.component';

@Component({
  selector: 'diary-goal',
  standalone: true,
  imports: [GoalDragNDropComponent, DayRadioComponent],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss',
})
export class GoalComponent {}
