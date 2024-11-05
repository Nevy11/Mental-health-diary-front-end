import { Component, OnInit } from '@angular/core';
import { GoalDragNDropComponent } from './goal-drag-n-drop/goal-drag-n-drop.component';
import { DayRadioComponent } from './day-radio/day-radio.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddGoalFormComponent } from './goal-drag-n-drop/add-goal-form/add-goal-form.component';
import { DayRadioService } from './day-radio/day-radio.service';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'diary-goal',
  standalone: true,
  imports: [
    GoalDragNDropComponent,
    DayRadioComponent,
    MatIconModule,
    AddGoalFormComponent,
  ],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('0.5s ease-in')]),
      transition(':leave', [animate('0.5s ease-out')]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('scaleInOut', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('1s ease-out', style({ transform: 'scale(0)' })),
      ]),
      transition(':leave', [
        animate('1s ease-in', style({ transform: 'scale(0)' })),
      ]),
    ]),
    trigger('bounce', [
      transition(':enter', [
        animate(
          '1s ease-in',
          keyframes([
            style({ transform: 'translateY(0)', offset: 0 }),
            style({ transform: 'translateY(-30px)', offset: 0.5 }),
            style({ transform: 'translateY(0)', offset: 1.0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class GoalComponent implements OnInit {
  constructor(
    private router: Router,
    private dayRadioService: DayRadioService
  ) {}
  to_dashboard() {
    this.router.navigate(['dashboard']);
  }

  my_day!: string;
  stored_fav_day!: string;
  ngOnInit(): void {
    this.dayRadioService.GetCurrentDayFromBackend().subscribe((resp) => {
      console.log(resp);
      this.my_day = resp.day;
    });
    this.dayRadioService.get_favourite_day().subscribe((resp) => {
      console.log(resp);
      if (resp.success) {
        this.stored_fav_day = resp.day_favourite;
      } else {
        console.error(resp.message);
      }
    });
  }
}
