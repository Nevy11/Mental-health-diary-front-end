import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddGoalService } from './add-goal-form/add-goal.service';
import { LoginService } from '../../login/login.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DayRadioService } from '../day-radio/day-radio.service';
import { catchError, tap } from 'rxjs';

@Component({
    selector: 'diary-goal-drag-n-drop',
    templateUrl: './goal-drag-n-drop.component.html',
    styleUrl: './goal-drag-n-drop.component.scss',
    imports: [CdkDrag, CdkDropList, MatButtonModule, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalDragNDropComponent implements OnInit {
  constructor(
    private addGoalService: AddGoalService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dayRadioService: DayRadioService
  ) {}
  todo: string[] = [];
  done: string[] = [];
  show_todo: boolean = false;
  ngOnInit(): void {
    const username = this.loginService.get_name_of_user;
    this.addGoalService
      .get_todo_from_backend({ username })
      .subscribe((resp) => {
        console.log(resp);
        resp.forEach((element) => {
          console.log('Element: ', element);
          this.todo.push(element.goal_name);
        });
      });

    this.addGoalService.read_one_done_goal({ username }).subscribe((resp) => {
      console.log(resp);
      resp.forEach((element) => {
        console.log('Done Name: ', element.goal_name);
        this.done.push(element.goal_name);
      });
    });
  }
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
  check_todo_and_done() {
    console.log(`todo: ${this.todo}`);
    console.log(`done: ${this.done}`);
    this.show_todo = true;
  }

  update_to_do() {
    const username = this.loginService.get_name_of_user;
  }
  clear() {
    const username = this.loginService.get_name_of_user;
    this.addGoalService.clear_todo_Goals({ username }).subscribe((resp) => {
      console.log(resp);
    });
    this.addGoalService
      .delete_all_done_goals({ username: username })
      .subscribe((resp) => {
        console.log(resp);
      });
    this.addGoalService.clearGoals();
    this.router.navigate(['dashboard']);
    this.snackBar.open(
      'The stored goals has been cleared. Would you like to tell me anything?',
      'Close',
      {
        duration: 3000,
      }
    );
  }
  test_done() {
    console.log(`todo: ${this.todo}`);
    console.log(`Done: ${this.done}`);
    const username = this.loginService.get_name_of_user;
    console.log(
      `Looping over everythin on the todo list to update it in the database.`
    );
    for (let index = 0; index < this.todo.length; index++) {
      const goal = this.todo[index];
      console.log(`starting with: ${goal}`);
      this.addGoalService
        .check_done_exists({ username: username, goal_name: goal })
        .subscribe((resp) => {
          console.log(resp);
          if (resp.success) {
            if (resp.exists) {
              this.addGoalService
                .delete_one_done_goal({ username: username, goal_name: goal })
                .subscribe((resp) => {
                  console.log(`Deletes ${goal} from the done database`);
                  console.log(resp);
                });
            } else {
              console.log(`${goal} is  not in the done database.`);
            }
            this.addGoalService
              .check_todo_exists({ username: username, goal_name: goal })
              .subscribe((resp) => {
                console.log(`Checking to see if it exists in the database.`);
                console.log(resp);
                if (resp.success) {
                  if (resp.exists) {
                    this.addGoalService
                      .update_todo_from_backend({
                        username: username,
                        old_value: goal,
                        new_value: goal,
                      })
                      .subscribe((resp) => {
                        console.log(
                          `Updating ${goal} in the todo table in database\n${resp}`
                        );
                      });
                  } else {
                    this.addGoalService
                      .add_todo_Goal({ username: username, goal_name: goal })
                      .subscribe((resp) => {
                        console.log(
                          `Creating a new data ${goal} in todo table\n${resp}`
                        );
                      });
                  }
                } else {
                  console.error(resp.message);
                }
              });
            // }
          } else {
            console.error(resp.message);
          }
        });
    }
    // Done database
    console.log(
      `Looping over everything on the done list to update it in the database.`
    );
    for (let index = 0; index < this.done.length; index++) {
      const goal = this.done[index];
      console.log(`starting with: ${goal}`);
      this.addGoalService
        .check_todo_exists({ username: username, goal_name: goal })
        .subscribe((resp) => {
          console.log(resp);
          if (resp.success) {
            if (resp.exists) {
              this.addGoalService
                .Remove_todo_goals({ username: username, goal_name: goal })
                .subscribe((resp) => {
                  console.log(`Deletes ${goal} from the todo database`);
                  console.log(resp);
                });
            } else {
              console.log(`${goal} is not in the done table in the database.`);
            }
            this.addGoalService
              .check_done_exists({ username: username, goal_name: goal })
              .subscribe((resp) => {
                console.log(
                  `Checking to see if ${goal} exists in the Done databae.`
                );
                console.log(resp);
                if (resp.success) {
                  if (resp.exists) {
                    this.addGoalService
                      .update_done_goal({
                        username: username,
                        old_value: goal,
                        new_value: goal,
                      })
                      .subscribe((resp) => {
                        console.log(
                          `Updating ${goal} in the Done table in database\n${resp}`
                        );
                      });
                  } else {
                    this.addGoalService
                      .create_done_goal({
                        username: username,
                        goal_name: goal,
                      })
                      .subscribe((resp) => {
                        console.log(
                          `Creating a new data ${goal} in Done table\n${resp}`
                        );
                      });
                  }
                } else {
                  console.error(resp.message);
                }
              });
          } else {
            console.error(resp.message);
          }
        });
    }
    this.router.navigate(['dashboard']);
    if (this.todo.length == 0 && this.done.length > 0) {
      const username = this.loginService.get_name_of_user;
      this.addGoalService.clear_todo_Goals({ username }).subscribe((resp) => {
        console.log(resp);
      });
      this.addGoalService
        .delete_all_done_goals({ username: username })
        .subscribe((resp) => {
          console.log(resp);
        });
      this.addGoalService.clearGoals();
      this.dayRadioService
        .GetCurrentDayFromBackend()
        .pipe(
          tap((current_day) => {
            this.dayRadioService
              .create_favourite_day(current_day.day)
              .pipe(tap((resp) => console.log(resp)))
              .subscribe();
          })
        )
        .subscribe();
      this.snackBar.open(
        `Hurray!! ${username}!, You have achieved all your goals.`,
        'Close',
        { duration: 5000 }
      );
    } else {
      this.snackBar.open(
        `Congratulations ${username} for completing today's goal`,
        'Close',
        { duration: 3000 }
      );
    }
  }
}
