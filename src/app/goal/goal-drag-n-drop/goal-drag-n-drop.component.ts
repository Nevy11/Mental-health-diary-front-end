import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddGoalFormComponent } from './add-goal-form/add-goal-form.component';

@Component({
  selector: 'diary-goal-drag-n-drop',
  templateUrl: './goal-drag-n-drop.component.html',
  styleUrl: './goal-drag-n-drop.component.scss',
  standalone: true,
  imports: [CdkDrag, CdkDropList, AddGoalFormComponent],
})
export class GoalDragNDropComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
