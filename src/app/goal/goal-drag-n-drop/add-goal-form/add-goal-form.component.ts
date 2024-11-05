import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../login/login.service';
import { AddGoalService } from './add-goal.service';
import { GoalsReturned } from './add-form';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'diary-add-goal-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './add-goal-form.component.html',
  styleUrl: './add-goal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGoalFormComponent implements OnInit {
  goalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private addGoalService: AddGoalService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.goalForm = this.fb.group({
      goal: new FormControl('', Validators.required), // Use an object, not an array
    });
    const username = this.loginService.get_name_of_user;
    this.addGoalService
      .get_todo_from_backend({ username })
      .subscribe((resp) => {
        const goals = resp as GoalsReturned[];
        goals.forEach((goal) => {
          this.addGoalService.add_todo = goal.goal_name;
        });
      });
  }

  get_goal() {
    this.goalForm.get('goal');
  }
  name: string = 'Stephen mainda';
  todo_stored: string[] = [];
  onSubmit() {
    if (this.goalForm.valid) {
      const { goal } = this.goalForm.value;
      const username = this.loginService.get_name_of_user;

      this.goalForm.reset();
      let available: boolean = false;
      for (let index = 0; index < this.todo_stored.length; index++) {
        const element = this.todo_stored[index];
        if (element == goal) {
          available = true;
        }
      }
      if (available == false) {
        this.todo_stored.push(goal);
        this.addGoalService
          .add_todo_Goal({ username: username, goal_name: goal })
          .subscribe((resp) => {
            console.log(resp);
          });
      } else {
        this.snackBar.open('This value has already been entered!', 'Close', {
          duration: 3000,
        });
      }
    } else {
      console.error('Fill in the missing form');
    }
  }

  clear() {
    const username = this.loginService.get_name_of_user;
    this.addGoalService.clear_todo_Goals({ username }).subscribe((resp) => {
      console.log(resp);
    });
    this.addGoalService.clearGoals();
    this.todo_stored = [];
    this.snackBar.open('The stored goals has been cleared.', 'Close', {
      duration: 3000,
    });
  }
}
