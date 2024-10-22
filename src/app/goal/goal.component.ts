import { Component } from '@angular/core';
import { GoalDragNDropComponent } from './goal-drag-n-drop/goal-drag-n-drop.component';
import { DayRadioComponent } from './day-radio/day-radio.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'diary-goal',
  standalone: true,
  imports: [GoalDragNDropComponent, DayRadioComponent, MatIconModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss',
})
export class GoalComponent {
  constructor(private router: Router) {}
  to_dashboard() {
    this.router.navigate(['dashboard']);
  }
}
